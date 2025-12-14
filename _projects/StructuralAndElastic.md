---
layout: page
title: Structural+Elastic Faulting
description: Structural kinematics and elastic dislocation are the same.
importance: 994
category: project
giscus_comments: false
---

## Structural Kinematics and Elastic Dislocations Are Equivalent

A fundamental principle in structural geology is that slip on a dipping fault induces a rigid translation of the hanging wall. For a fault dipping at an angle $\delta$ with a fault-parallel slip rate $S$, the resulting surface velocity field is a simple geometric projection:

$$
\begin{aligned}
u_x &= S \cos\delta, \\
u_z &= S \sin\delta.
\end{aligned}
$$

While this structural velocity field is often treated as a purely kinematic construction independent of material properties, it can be derived directly from elastic dislocation theory. In a half-space, the deformation field of a finite dislocation decays with distance from the fault tips. However, if one endpoint extends to infinity (modeling a semi-infinite fault), the decay term at that end vanishes. In this far-field limit, the elastic solution converges to a constant rigid translation:

$$
\begin{aligned}
\lim_{x \to \infty} u^{\text{elastic}}_x &\propto \cos\delta, \\
\lim_{x \to \infty} u^{\text{elastic}}_z &\propto \sin\delta.
\end{aligned}
$$

Consequently, in the far field where strain vanishes, the elastic solution and the structural kinematic model are numerically identical.

## Interseismic vs. Coseismic Decomposition

Given that the steady-state structural solution coincides with the semi-infinite elastic solution, the total elastic surface velocity field can be decomposed as:

$$
\begin{aligned}
\mathbf{v}_{\text{total}} &= \mathbf{v}_{\text{structural}} + \mathbf{v}_{\text{coseismic}}.
\end{aligned}
$$

Here, $\mathbf{v}_{\text{structural}}$ represents the steady, long-term block motion, while $\mathbf{v}_{\text{coseismic}}$ represents the contribution from finite dislocations (earthquakes). Rearranging this yields a definition for the interseismic signal:

$$
\begin{aligned}
\mathbf{v}_{\text{interseismic}} &= \mathbf{v}_{\text{structural}} - \mathbf{v}_{\text{elastic (finite)}}.
\end{aligned}
$$

This formulation highlights two critical implications:

1.  **Interseismic deformation is independent of a semi-infinite décollement.** The equivalence holds purely via the steady-state limit.
2.  **Modularity of Coseismic Slip.** Coseismic contributions can be activated or deactivated segment-by-segment without altering the underlying structural velocity field.

In the associated code, the "Elastic Total" curves represent the summation of elastic dislocations for individual fault and axial segments. The "Diff" curves represent the interseismic residual defined above.

---

## Axial Surfaces and Fold Dislocations

In piecewise fault geometries, adjacent segments often possess distinct dip angles, $\delta_{i-1}$ and $\delta_i$. This change in geometry creates a velocity discontinuity across the kink. The mismatch in the rigid translation vector $\Delta \mathbf{u}$ is given by:

$$
\begin{aligned}
\Delta \mathbf{u} &= \mathbf{u}_i - \mathbf{u}_{i-1} \\
&= S \left[ (\cos\delta_i - \cos\delta_{i-1}) \hat{x} + (-\sin\delta_i + \sin\delta_{i-1}) \hat{z} \right].
\end{aligned}
$$

To enforce kinematic compatibility—ensuring the hanging wall does not separate or overlap—an **axial-surface (fold) dislocation** is introduced. The slip on this fold, $S_{\text{fold}}$, is constrained such that the vertical motion transmitted across the fold matches the vertical motion delivered by the underlying ramp:

$$
\begin{aligned}
S_{\text{fold}} \sin(\delta_{\text{fold}}) &= S_{\text{ramp}} \sin(\delta_{\text{ramp}}).
\end{aligned}
$$

Rearranging this conservation of vertical motion yields the required fold slip rate:

$$
\begin{aligned}
S_{\text{fold}} &= S_{\text{ramp}} \frac{\sin(\delta_{\text{ramp}})}{\sin(\delta_{\text{fold}})}.
\end{aligned}
$$

In the limit of small angles, or when expressed via the change in dip across the kink, this relationship simplifies to the implementation used in the code:

$$
\begin{aligned}
S_{\text{fold}} &= 2S \sin\left( \frac{\delta_i - \delta_{i-1}}{2} \right).
\end{aligned}
$$

The sign of $S_{\text{fold}}$ is determined by whether the fault steepens or flattens. A negative slip value is therefore not an error, but a geometric necessity to close the velocity mismatch.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/rampislocked/12.14.fig2.png" title="Fold Ramp" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
