---
layout: page
title: FractalCNN
description: Inferring 3D fractal dimension from 2D floc images using synthetic datasets and CNNs
img: https://raw.githubusercontent.com/braydennoh/fractalCNN/main/images/flocrotate.gif
importance: 1
category: work
giscus_comments: true
---


# FractalCNN

## Determining a 3D Parameter (Fractal Dimension) from 2D Images (Floc Images)

How can the fractal dimension, a fundamental 3D geometric property, be accurately inferred from 2D projections of flocs? This challenge highlights the inherent loss of information when transitioning from higher-dimensional data to lower-dimensional representations.

![Rotating Floc Visualization](https://github.com/braydennoh/fractalCNN/raw/main/images/flocrotate.gif)

---

## Synthetic Fractal Aggregates and Fractal Dimension Calculation

We generate synthetic fractal aggregates and compute their fractal dimension using the **Grassberger-Procaccia algorithm**.

![Fractal Aggregates](https://github.com/braydennoh/fractalCNN/raw/main/images/Slide1.png)

---

## CNN-Based Prediction of Fractal Dimension

We train a **convolutional neural network (CNN)** to predict the fractal dimension using 2D input images.  
We found that applying various levels of **Gaussian blur** improves prediction accuracy.

![CNN Predictions](https://github.com/braydennoh/fractalCNN/raw/main/images/Slide2.png)
