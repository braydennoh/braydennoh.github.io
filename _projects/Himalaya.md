---
layout: page
title: Himalayan Uplift
description: Kinematic dislocation model to vertical uplift in the Himalayas
importance: 13
category: project
giscus_comments: false
---

## Introduction

One can infer vertical uplift from the elastic dislocation model for a thrust fault. I'm using solutions from Chapter 3 of *Earthquake and Volcano Deformation* by Paul Segall (2010).

Equation (3.70): Surface displacements (buried semi-infinite fault)

This equation calculates the surface displacement from a single, buried edge dislocation whose top is at depth *d*.

$$
\begin{aligned}
u_1(x_1, x_2 = 0) &= \frac{s}{\pi}\Big[ \cos\delta \tan^{-1}(\zeta) + \frac{\sin\delta - \zeta\cos\delta}{1+\zeta^2} \Big], \\
u_2(x_1, x_2 = 0) &= -\frac{s}{\pi}\Big[ \sin\delta \tan^{-1}(\zeta) + \frac{\cos\delta + \zeta\sin\delta}{1+\zeta^2} \Big],
\end{aligned}
$$


Equation (3.73): Surface displacements (finite-width, surface-breaking fault)

This equation models a fault that ruptures from the surface down to a depth *d*. 

$$
\begin{aligned}
u_1(x_1,0)&= -\frac{s}{\pi}\Big( \cos\delta \,[ \tan^{-1}(\zeta) - \tfrac{\pi}{2}\,\text{sgn}(x_1) ] + \frac{\sin\delta - \zeta\cos\delta}{1+\zeta^2} \Big), \\
u_2(x_1,0)&= \frac{s}{\pi}\Big( \sin\delta \,[ \tan^{-1}(\zeta) - \tfrac{\pi}{2}\,\text{sgn}(x_1) ] + \frac{\cos\delta + \zeta\sin\delta}{1+\zeta^2} \Big).
\end{aligned}
$$

where

$$\zeta = \frac{x_1 - x_d}{d}.$$

This implementation evaluates these equations at the ground surface to generate:
- Horizontal displacement ($u_1$): motion toward/away from the fault. 
- Vertical displacement ($u_2$): uplift or subsidence. 
- Horizontal strain ($\varepsilon_{11}$): elastic rebound across the profile.

It seems clear that in the Himalayas, there is a flat–ramp–flat structure, and the ramp is locked during the interseismic period (Cattin & Avouac, 2000). The lower flat creeps steadily at known rates (~20 mm/yr). Suppose the upper flat and ramp remain locked indefinitely—then the interseismic uplift equals the “long-term uplift,” which may persist as signals in bedrock river profiles. In contrast, if the entire flat–ramp–flat system slips at the same rate over a sufficiently long observation window, the system is at steady state. Between these two endmembers, the intensity and location of maximum uplift will shift due to the varying contributions of each fault segment. Therefore, fitting the river’s bulge position to this gradient could quantify the degree of imbalance. A strong prior, I think, is that this fraction cannot be 0 (no slip on the flat and ramp) or 1 (because Himalayan coseismic ruptures are highly irregular and separated by long intervals).

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
         path="/assets/img/rampislocked/rampislocked.gif" 
         title="Evolution of Uplift" 
         class="img-fluid"
         style="border:none; box-shadow:none; padding:0; margin:0; border-radius:0;" 
    %}
  </div>
</div>

## Fold Slip and Kinematic Balance

Based on CoInterFaultFold2D ([Meade, GitHub](https://github.com/brendanjmeade/CoInterFaultFold2D/)), thin-skinned deformation can be viewed as a fold acting as a kinematic hinge above a fault-bend ramp. As the ramp slips, the fold accommodates excess horizontal shortening while maintaining vertical continuity, lifting the overlying sedimentary mass and converting horizontal motion into vertical uplift. 

In a flat–ramp–flat geometry, the ramp behaves as a dipping thrust fault, and the fold defines the bisector surface connecting the ramp to the overlying flat. Together they form a simple kinematic wedge. The ramp transfers slip upward, the fold redistributes it to maintain a continuous topographic surface. Each segment contributes a vertical component of slip rate:

$$
\begin{aligned}
V_i &= S_i \sin(\delta_i),
\end{aligned}
$$

where $S_i$ is the total slip rate and $\delta_i$ is the dip angle of the $i^{\text{th}}$ segment.

To ensure kinematic continuity at the ramp–fold junction, that is the material on both sides of 
the hinge moves together without a discontinuity in vertical motion, the vertical components of slip must balance:

$$
\begin{aligned}
S_{\text{fold}} \sin(\delta_{\text{fold}}) &= S_{\text{ramp}} \sin(\delta_{\text{ramp}}).
\end{aligned}
$$

This enforces the fold transmits the same vertical motion that the ramp delivers, 
effectively closing the "box" of uplift between their surface traces. Rearranging gives the expression for the fold slip rate:

$$
\begin{aligned}
S_{\text{fold}}
&= S_{\text{ramp}}
\frac{\sin(\delta_{\text{ramp}})}{\sin(\delta_{\text{fold}})}.
\end{aligned}
$$

For example,

$$
\begin{aligned}
\delta_{\text{ramp}} &= 45^{\circ}, \\
\delta_{\text{fold}} &= 67.5^{\circ}, \\
S_{\text{ramp}} &= 20~\text{mm/yr}.
\end{aligned}
$$

Substituting gives

$$
\begin{aligned}
S_{\text{fold}} 
&= 20 
\frac{\sin 45^{\circ}}{\sin 67.5^{\circ}} \\[6pt]
&= 20 \times \frac{0.7071}{0.9239} \\[6pt]
&\approx 15.3~\text{mm/yr}.
\end{aligned}
$$

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/rampislocked/faultfoldexamples.png" title="Fold Ramp" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
