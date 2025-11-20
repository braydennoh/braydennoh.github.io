---
layout: page
title: Molnar Inversion
description: Inversion of uplift rate to fault geometry
importance: 2
category: project
giscus_comments: false
---

This is a brief summary of the methods used in Peter Molnar's 1987 paper, "Inversion of profiles of uplift rates for the geometry of dip-slip faults at depth, with examples from the Alps and the Himalaya." The pdf can be found [here](/assets/pdf/6571592.pdf). 


## Uplift Profile

Assumes a simple uplift function of the form

$$
u(x) = u_0\,\frac{x}{d}\,\exp\!\left(1 - \frac{x}{d}\right),
$$

where $u_0$ is the maximum uplift rate at $x = d$.

## Vertical Shear: Basic Derivation

The simplest case is vertical simple shear (\(\delta = 90^\circ\)). Let \(v\) be the convergence rate and \(\Theta\) the plunge of the slip vector. Molnar writes the vertical‐shear kinematic compatibility condition as

$$
\begin{aligned}
u(x)
    &= v_y \;-\; v_x \frac{dy}{dx} \\
    &= -\,v\sin\Theta \;-\; v\cos\Theta\,\frac{dy}{dx}.
\end{aligned}
$$

Rearranging for the fault slope gives

$$
\frac{dy}{dx}
    = -\tan\Theta
      - \frac{u(x)}{v\cos\Theta}.
$$

Integrating from a reference position \(x_0\) yields the inferred fault geometry

$$
y(x)
    = y_0
      - (x - x_0)\tan\Theta
      - \frac{1}{v\cos\Theta}
        \int_{x_0}^{x}
        u(\xi)\, d\xi .
$$

This is exactly the expression that my Python function uses for the \(\delta = 90^\circ\) case.  
The cumulative integral is evaluated numerically using a simple trapezoidal rule.

## Dipping Shear Planes

When shear occurs on dipping planes with dip angle \(\delta\), Molnar solves the problem in a rotated coordinate system. The rotation angle is

$$
\phi = 90^\circ - \delta ,
$$

chosen so that the new \(y'\)-axis aligns with the shear direction. In the rotated frame, the uplift normal to the shear plane becomes

$$
u' = \frac{u}{\sin\delta}.
$$

The slip vector components in the primed frame are

$$
\begin{aligned}
v_x' &= v \cos(\Theta - \phi), \\
v_y' &= -v \sin(\Theta - \phi).
\end{aligned}
$$

In this rotated frame the governing equation is identical to the vertical‐shear solution:

$$
y'(x')
    = y_0'
      - (x' - x_0') \tan(\Theta - \phi)
      - \frac{1}{v_x'}
        \int u'(x')\, dx' .
$$

Finally, the geometry is transformed back to the original coordinates via

$$
\begin{aligned}
x &= x'\cos\phi + y'\sin\phi, \\
y &= -x'\sin\phi + y'\cos\phi.
\end{aligned}
$$

## Results

Using these expressions, I compute fault geometries for several convergence rates  
(\(v = 2, 4, 8 \ \text{mm/yr}\)) and for shear on both vertical (\(\delta = 90^\circ\)) and dipping (\(\delta = 45^\circ\)) planes. Higher convergence rates lead to shallower geometries, while dipping shear planes produce much flatter inferred profiles due to the rotation of the uplift vector into the shear direction.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/rampislocked/molnarfigure.png" title="Molar Inversion" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

## Code

{% raw %}
```python
import numpy as np
import matplotlib.pyplot as plt

x_max, nx = 240.0, 500
x = np.linspace(0.0, x_max, nx)
u0, d = 1.0, 40.0

def uplift_profile(x, u0=1.0, d=40.0):
    return u0 * (x / d) * np.exp(1.0 - x / d)

u = uplift_profile(x, u0=u0, d=d)

def cumtrapz(f, x):
    integ = np.zeros_like(f)
    for i in range(1, len(f)):
        dx = x[i] - x[i - 1]
        integ[i] = integ[i - 1] + 0.5 * (f[i] + f[i - 1]) * dx
    return integ

def infer_fault_profile(x, u, v, theta_deg=0.0, delta_deg=90.0, x0=0.0, y0=0.0):
    theta = np.deg2rad(theta_deg)
    delta = np.deg2rad(delta_deg)
    if np.isclose(delta_deg, 90.0):
        vx = v * np.cos(theta)
        I = cumtrapz(u, x)
        y = y0 - (x - x0) * np.tan(theta) - I / vx
        return x, y
    phi = np.deg2rad(90.0 - delta_deg)
    u_p = u / np.sin(delta)
    vx_p = v * np.cos(theta - phi)
    I_p = cumtrapz(u_p, x)
    y_p = y0 - (x - x0) * np.tan(theta - phi) - I_p / vx_p
    x_p = x * np.cos(phi) + y_p * np.sin(phi)
    y_p2 = -x * np.sin(phi) + y_p * np.cos(phi)
    return x_p, y_p2

v_list = [2.0, 4.0, 8.0]
delta_list = [90.0, 45.0]
colors = ['C0', 'C1', 'C2']

fig, (ax_u, ax_y) = plt.subplots(2, 1, figsize=(5, 5), sharex=True)

ax_u.plot(x, u, label='u(x) = x exp(1 - x/d)/d')
ax_u.set_ylabel('Uplift rate (mm/yr)')
ax_u.set_xlim(0, x_max)
ax_u.legend(loc='upper right')

for j, v in enumerate(v_list):
    for delta_deg in delta_list:
        x_f, y_f = infer_fault_profile(x, u, v=v, theta_deg=0.0, delta_deg=delta_deg, x0=0.0, y0=0.0)
        ls = '-' if delta_deg == 90.0 else '--'
        label = f'{v:.0f} mm/yr, δ = {int(delta_deg)}°'
        ax_y.plot(x_f, y_f, ls, color=colors[j], label=label)

ax_y.set_xlabel('Distance (km)')
ax_y.set_ylabel('Depth (km)')
ax_y.legend(loc='lower left', fontsize=8)

plt.tight_layout()
plt.show()
````

{% endraw %}
