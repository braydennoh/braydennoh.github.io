---
layout: page
title: Unbalanced River
description: A Python implementation of Meade (2010)
importance: 994
category: project
giscus_comments: false
---

This is a Python implementation of the unbalanced  mountain building model proposed by [Brendan Meade (2010)]([/assets/pdf/minmountain.pdf](https://pubs.geoscienceworld.org/gsa/geology/article-abstract/38/11/987/130140/The-signature-of-an-unbalanced-earthquake-cycle-in)). The fundamental hypothesis is that crustal deformation minimizes the total mechanical work, $W_{total}$, defined as the sum of dissipative frictional work ($W_f$) and gravitational potential work ($W_g$).

The optimization is recursive, updating the cost function as topography evolves. Although this approach is analogous to variational principles in Lagrangian Mechanics, it differs by neglecting the kinetic energy term, thereby treating the system as a quasi-static evolution of static equilibrium states (therefore, "controversial"). This is the [Jupyter Code](/assets/jupyter/MinimumMountain.ipynb).

Secondary effects such as strain weakening (where active faults progressively become weaker/memory) and surface erosion are not currently implemented. The simulation focuses only on the competition between frictional and gravitational work in a homogenous crust.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
         path="/assets/img/rampislocked/minmount.gif" 
         title="Evolution of Uplift" 
         class="img-fluid"
         style="border:none; box-shadow:none; padding:0; margin:0; border-radius:0;" 
    %}
  </div>
</div>


## 1. Physical Parameters

{% raw %}
```python
@dataclass
class Params:
    W: float = 200e3           # Domain width (m)
    H: float = 30e3            # Crustal thickness (m)
    dx: float = 4e3            # Horizontal node spacing (m)
    dz: float = 2e3            # Vertical node spacing (m)
    shorten_dx: float = 160.0  # Horizontal shortening increment (m)
    rho_c: float = 2700.0      # Crustal density (kg/m^3)
    g: float = 9.81            # Gravity (m/s^2)
    mu: float = 0.20           # Friction coefficient
    lam: float = 0.37          # Hubbert–Rubey pore fluid ratio
    deltaxx: float = 1.0e8     # Tectonic driving stress (Pa)
    max_up: int = 3            # Max vertical steps per horizontal step

P = Params()
````

{% endraw %}

## 2\. Fault Geometry

The model is discretized into a grid. A fault segment connects one node to another. We calculate the dip angle $\theta$ for any given segment based on how many vertical steps (`up_steps`) are taken for one horizontal step.

{% raw %}

```python
def segment_theta(up_steps: int) -> float:
    dz = up_steps * P.dz
    return math.atan2(dz, P.dx)
```

{% endraw %}

## 3\. Resolving Stresses

To calculate friction, we must resolve the regional stresses onto the specific fault plane $\theta$. The paper uses Anderson's theory of faulting. The function below calculates the effective normal stress ($\sigma_{eff}$) and the shear stress ($\tau_{fric}$) required for sliding, accounting for pore fluid pressure ($\lambda$).

{% raw %}

```python
def sigma_components(d: float, h_local: float, theta: float):
    # Vertical lithostatic stress
    sigma3 = P.rho_c * P.g * (d + h_local)
    # Horizontal tectonic stress
    sigma1 = sigma3 + P.deltaxx
    
    # Normal stress on the dipping plane (Eq 1 in paper)
    sigma_n = 0.5 * (sigma1 + sigma3) - 0.5 * (sigma1 - sigma3) * math.cos(2.0 * theta)
    
    # Effective normal stress (Hubbert-Rubey)
    sigma_eff = max(sigma_n - P.lam * sigma3, 0.0)
    
    # Shear stress (Coulomb friction)
    tau_fric = P.mu * sigma_eff
    return sigma3, sigma1, sigma_n, tau_fric
```

{% endraw %}


## 4\. Calculating Work

For a candidate fault segment, it calculates two work terms:

1.  Gravitational Work ($W_g$): The work done against gravity to uplift the rock column. This depends on the crustal density $\rho_c$, gravity $g$, and the total burden defined by the depth $d$ plus the local topography $h$. The work is calculated as the force of gravity multiplied by the vertical displacement ($u \sin \theta$):

    $$
    W_g = \rho_c A_h g (d + h) (u \sin \theta)
    $$

    where $A_h$ is the horizontal area of the column segment.

2.  Frictional Work ($W_f$): The work done to overcome friction along the fault plane. This is a function of the shear stress $\tau$ and the fault surface area $A_f$:

    $$
    W_f = \tau A_f u
    $$

    where $u$ is the total slip along the fault segment.


{% raw %}

```python
def segment_work(k: int, i: int, di: int, dk: int, h: np.ndarray):
    k2, i2 = k + dk, i + di
    # Check grid bounds
    if not (0 <= i2 < Nx and 0 <= k2 <= k):
        return None

    up = -dk
    theta = segment_theta(up)

    horiz_len = P.dx
    along_fault = math.hypot(P.dx, up * P.dz)

    d = z_nodes[k]
    h_local = h[i]

    # Gravitational work (Eq 11)
    Wg = P.rho_c * P.g * horiz_len * (d + h_local) * (P.shorten_dx * math.sin(theta))

    # Frictional work (Eq 12)
    _, _, _, tau = sigma_components(d, h_local, theta)
    Wf = tau * along_fault * P.shorten_dx

    return Wg + Wf, theta, (k2, i2)
```

{% endraw %}

## 5\. Finding the Minimum Work Path

I used Dijkstra's algorithm to find the optimal fault trajectory. The algorithm searches the grid graph starting from the detachment depth (`START`) to find the path to the surface that minimizes the sum of $W_g + W_f$.

{% raw %}

```python
def min_work_path(h: np.ndarray):
    INF = float("inf")
    dist = np.full((Nz, Nx), INF, dtype=float)
    parent = np.full((Nz, Nx, 2), -1, dtype=int)
    theta_to = np.zeros((Nz, Nx), dtype=float)

    dist[START] = 0.0
    pq = [(0.0, START)]

    while pq:
        cur_cost, (k, i) = heapq.heappop(pq)
        if cur_cost > dist[k, i]:
            continue

        for di, dk in DIRS:
            out = segment_work(k, i, di, dk, h)
            if out is None:
                continue
            seg_cost, theta, (k2, i2) = out
            new_cost = cur_cost + seg_cost
            if new_cost < dist[k2, i2]:
                dist[k2, i2] = new_cost
                parent[k2, i2] = (k, i)
                theta_to[k2, i2] = theta
                heapq.heappush(pq, (new_cost, (k2, i2)))

    # Find the global minimum cost node on the surface (k=0)
    best_surface_node = None
    best_cost = INF
    for ix in range(Nx):
        if dist[0, ix] < best_cost:
            best_cost = dist[0, ix]
            best_surface_node = (0, ix)

    if best_surface_node is None:
        return []

    # Backtrack to reconstruct the path
    path_segments = []
    node = best_surface_node
    while node != START:
        k2, i2 = node
        prev_k, prev_i = parent[k2, i2]
        if prev_k == -1:
            break
        th = theta_to[k2, i2]
        x0, z0 = x_nodes[prev_i], z_nodes[prev_k]
        x1, z1 = x_nodes[i2], z_nodes[k2]
        path_segments.append(((x0, z0), (x1, z1), th))
        node = (prev_k, prev_i)

    path_segments.reverse()
    return path_segments
```

{% endraw %}

## 6\. Updating Topography

Once the optimal fault path is identified, slip is applied along the fault. This uplifts the surface topography $h$. This is a recursive model. The new topography increases the gravitational work penalty for subsequent steps, forcing future faults to migrate or change geometry.

{% raw %}

```python
def update_topography(h: np.ndarray, path_segments):
    for (x0, z0), (x1, z1), th in path_segments:
        if abs(math.cos(th)) < 1e-6:
            continue
        # Uplift calculation
        delta_h = P.shorten_dx * math.tan(th)
        
        # Apply uplift to nodes spanning this segment
        i0 = int(round(x0 / P.dx))
        i1 = int(round(x1 / P.dx))
        start_idx = min(i0, i1)
        end_idx = max(i0, i1)
        for ii in range(start_idx, end_idx + 1):
            if 0 <= ii < len(h):
                h[ii] += delta_h
```

{% endraw %}

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
         path="/assets/img/rampislocked/minmount.png" 
         title="Evolution of Uplift" 
         class="img-fluid"
         style="border:none; box-shadow:none; padding:0; margin:0; border-radius:0;" 
    %}
  </div>
</div>
