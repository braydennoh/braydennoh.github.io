---
layout: page
title: FractalCNN
description: Inferring 3D fractal dimension from 2D floc images using synthetic datasets and CNNs
img: assets/img/blogcover/Slide2.jpeg
importance: 1
category: project
giscus_comments: true
---

How can the fractal dimension, a fundamental 3D geometric property, be accurately inferred from 2D projections of flocs? This challenge highlights the inherent loss of information when transitioning from higher-dimensional data to lower-dimensional representations.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="https://github.com/braydennoh/fractalCNN/raw/main/images/flocrotate.gif" title="Rotating Floc Visualization" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Animated 3D visualization of a rotating floc aggregate.
</div>

---

## Synthetic Fractal Aggregates and Fractal Dimension Calculation

We generate synthetic fractal aggregates and compute their fractal dimension using the **Grassberger-Procaccia algorithm**.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="https://github.com/braydennoh/fractalCNN/raw/main/images/Slide1.png" title="Synthetic Fractal Aggregates" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Examples of generated 2D projections of 3D synthetic fractal aggregates.
</div>

---

## CNN-Based Prediction of Fractal Dimension

We train a **convolutional neural network (CNN)** to predict the fractal dimension using 2D input images.  
We found that applying various levels of **Gaussian blur** improves prediction accuracy.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="https://github.com/braydennoh/fractalCNN/raw/main/images/Slide2.png" title="CNN Predictions" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  CNN prediction performance improves with pre-blurring of input images.
</div>
