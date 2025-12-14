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
u_x &= S \cos\delta, \
u_z &= S \sin\delta.
\end{aligned}
$$

A strike-slip fault makes the physical intuition clear, where the long-term far-field motion is set by the imposed slip rate, and elasticity mainly controls how deformation localizes near the fault. In the classic buried-dislocation model (e.g., Savage–Burford), the far-field approaches a constant translation while strain decays to zero. The same logic carries over to dip-slip geometries: in a half-space, a long (semi-infinite) dislocation removes that endpoint effect. In the far-field steady-slip limit, the elastic solution converges to rigid translation with components given by the same geometric projection:

$$
\begin{aligned}
\lim_{x \to \infty} u^{\text{elastic}}*x &= S \cos\delta, \
\lim*{x \to \infty} u^{\text{elastic}}_z &= S \sin\delta.
\end{aligned}
$$

Consequently, in the far field where strain vanishes, the elastic steady-slip solution and the structural kinematic model are numerically identical.

## Interseismic vs. Coseismic Decomposition

Given that the steady-state structural solution coincides with the semi-infinite elastic solution, the total elastic surface velocity field can be decomposed as:

$$
\begin{aligned}
\mathbf{v}*{\text{total}} &= \mathbf{v}*{\text{structural}} + \mathbf{v}_{\text{coseismic}}.
\end{aligned}
$$

Here, $\mathbf{v}*{\text{structural}}$ represents the steady, long-term block motion, while $\mathbf{v}*{\text{coseismic}}$ represents the contribution from finite dislocations (earthquakes). Rearranging this yields a definition for the interseismic signal:

$$
\begin{aligned}
\mathbf{v}*{\text{interseismic}} &= \mathbf{v}*{\text{structural}} - \mathbf{v}_{\text{elastic (finite)}}.
\end{aligned}
$$

## Axial Surfaces and Fold Dislocations

In piecewise fault geometries, adjacent segments often feature distinct dip angles, $\delta_{i-1}$ and $\delta_i$, which creates a velocity discontinuity across the kink. The mismatch in the rigid translation vector $\Delta \mathbf{u}$ is given by:

$$
\begin{aligned}
\Delta \mathbf{u} &= \mathbf{u}*i - \mathbf{u}*{i-1} \
&= S \left[ (\cos\delta_i - \cos\delta_{i-1}) \hat{x} + (-\sin\delta_i + \sin\delta_{i-1}) \hat{z} \right].
\end{aligned}
$$

To enforce kinematic compatibility—ensuring the hanging wall does not separate or overlap—an axial-surface (fold) dislocation is introduced (Souter and Hager, 1997). The slip on the fold, $S_{\text{fold}}$, is constrained such that the vertical motion transmitted across the fold matches the vertical motion delivered by the underlying ramp:

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

In the limit of small angles, or when expressed via the change in dip across the kink, this relationship simplifies to:

$$
\begin{aligned}
S_{\text{fold}} &= 2S \sin\left( \frac{\delta_i - \delta_{i-1}}{2} \right).
\end{aligned}
$$

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/rampislocked/12.14.fig1.png" title="Fold Ramp" class="img-fluid rounded z-depth-1" %}
  </div>
</div>


<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/rampislocked/12.14.fig2.png" title="Fold Ramp" class="img-fluid rounded z-depth-1" %}
  </div>
</div>




