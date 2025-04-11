---
layout: page
title: Bobcat Fire CO Emissions
description: Satellite-based modeling of carbon monoxide emissions from the 2020 Bobcat Fire
img: assets/img/blogcover/Slide3.jpeg
importance: 2
category: project
giscus_comments: true
---

# Satellite-driven Estimation of CO Emissions from the 2020 Bobcat Fire

This project quantifies CO emissions from the 2020 Bobcat Fire in the Angeles National Forest using satellite data and numerical modeling. TROPOMI satellite CO observations were combined with ground-level measurements from the Caltech Air Quality Station to estimate surface-level concentrations. A Gaussian Plume Model simulated CO dispersion, and MCMC methods were used to constrain the emission rate.

---

## Satellite Data and CO Column Observations

The TROPOMI satellite captured total column CO concentrations over Los Angeles during the Bobcat Fire. These observations reveal the shape and extent of the wildfire CO plume.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/ch171/1.png" title="TROPOMI CO Observations over Los Angeles" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Satellite-derived CO column density data from TROPOMI during the Bobcat Fire. The plume is visible above the Angeles National Forest.
</div>

---

## Interpolating Missing CO Data

To account for data coverage gaps in the satellite product, we applied Ordinary Kriging using a power variogram model. This approach reconstructs missing values and produces a continuous CO density surface.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/ch171/2.png" title="Spatial Interpolation using Kriging" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Raw TROPOMI CO data with gaps (left) and Kriging-interpolated surface (right), improving spatial coverage.
</div>

---

## Converting to Ground-Level CO Concentrations

A regression-based calibration using data from the Caltech Air Quality Station allowed us to convert satellite-derived CO columns into surface-level CO concentrations in ppm.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/ch171/3.png" title="Conversion of Satellite CO to Surface Concentrations" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Ground-level CO data enabled a linear conversion of satellite measurements into surface CO concentrations.
</div>

---

## Plume Dispersion Modeling

To estimate the spatial distribution of CO concentrations from the Bobcat Fire, we implemented a Gaussian Plume Model, a classical framework used in atmospheric pollutant dispersion. The model begins with the three-dimensional advection-diffusion equation:

$$
\frac{\partial C}{\partial t} + u \frac{\partial C}{\partial x} + v \frac{\partial C}{\partial y} + w \frac{\partial C}{\partial z} = K_x \frac{\partial^2 C}{\partial x^2} + K_y \frac{\partial^2 C}{\partial y^2} + K_z \frac{\partial^2 C}{\partial z^2}
$$

Here:
- \( C(x, y, z, t) \) is the concentration of CO (in ppm),
- \( u, v, w \) are wind velocities in the \( x, y, z \) directions (m/s),
- \( K_x, K_y, K_z \) are the turbulent diffusivity coefficients in each direction.

We simplify the equation under the assumptions of steady-state conditions and unidirectional wind flow (dominant along \( x \)-axis), neglecting advection in \( y \) and \( z \):

$$
u \frac{\partial C}{\partial x} = K_y \frac{\partial^2 C}{\partial y^2} + K_z \frac{\partial^2 C}{\partial z^2}
$$

The analytical solution to this simplified equation for a continuous point source at height \( H \) is:

$$
C(x, y, z) = \frac{Q}{2 \pi u \sigma_y \sigma_z} \exp\left( - \frac{y^2}{2 \sigma_y^2} \right) \left[ \exp\left( - \frac{(z - H)^2}{2 \sigma_z^2} \right) + \exp\left( - \frac{(z + H)^2}{2 \sigma_z^2} \right) \right]
$$

Where:
- \( Q \): emission rate of CO (g/s),
- \( u \): wind speed along plume direction (m/s),
- \( \sigma_y, \sigma_z \): dispersion parameters representing the standard deviations of the plume in lateral and vertical directions (m),
- \( H \): effective height of the emission source (m).

This solution models the downwind concentration of CO given a known source strength, wind speed, and atmospheric turbulence conditions. To constrain the parameters \( Q \), \( u \), and wind direction \( \theta \), we used a Markov chain Monte Carlo (MCMC) sampler and compared the model predictions with satellite-derived surface-level CO concentration maps.

## Plume Simulation and Emission Rate Estimation

A Gaussian Plume Model was implemented and constrained using MCMC sampling. The results yield a median CO emission rate of 2,292 tonnes per hour on September 12, 2020.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/ch171/4.png" title="Gaussian Plume Model and MCMC Results" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Posterior distributions for emission rate and wind direction. Emission estimates range from 1,900 to 2,684 tonnes/hour.
</div>

---

## Conclusion

By integrating TROPOMI satellite data, ground-based air quality measurements, and a plume dispersion model, we estimated the magnitude of CO released during the 2020 Bobcat Fire. This approach demonstrates the value of satellite-model fusion techniques for atmospheric emissions studies. Future work may extend this framework to incorporate complex terrain effects and multi-day wildfire events.
