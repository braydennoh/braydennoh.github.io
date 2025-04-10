---
layout: page
title: Pasadena NDVI
description: Assessing urbanization and green space change in Pasadena using satellite NDVI data
img: /assets/img/pasadenaNDVI/caltechnvdi.png
importance: 2
category: work
giscus_comments: true
---

# Pasadena NDVI

## Assessing Urbanization and Green Space using NDVI

Urbanization, while offering economic growth and infrastructure, poses challenges to sustaining healthy green spaces. This project examines how vegetation greenness in Pasadena, California changed from 2000 to 2020 using NDVI derived from Landsat 7 satellite data. We focus on the August scenes for 2000, 2010, and 2020.

Pasadena has experienced considerable development, with institutions like Caltech expanding significantly. At the same time, the city has promoted drought-tolerant landscaping practices. Our study explores how these trends influenced green space, particularly in residential and commercial zones.

---

## NDVI Change Across Pasadena

NDVI differences show a general decline in greenness across Pasadena between 2000 and 2020. Only parks and mountainous regions maintained or slightly improved in NDVI, while most developed areas exhibited a drop.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/pasadenaNDVI/1.png" title="NDVI Change in Pasadena (2000–2020)" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  NDVI in Pasadena from 2000 to 2020. Panel (d) shows net NDVI change. Developed areas show clear decline.
</div>

---

## Zonal NDVI Trends

Median NDVI declined from 0.3067 (2000) to 0.2714 (2020). Zonal analysis revealed that areas like commercial, multi-family, and single-family residential zones saw the steepest decline, while planned development and open space showed minor increases.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/pasadenaNDVI/2.png" title="NDVI by Zone Type" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: NDVI distribution shift. Right: Zonal NDVI changes from 2000–2020.
</div>

---

## Caltech vs. City-wide Trends

Caltech's NDVI declined faster than city averages—nearly double the rate of nearby Pasadena City College. This may reflect aggressive campus development paired with a shift to drought-tolerant landscaping.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/pasadenaNDVI/3.png" title="NDVI Trends: Caltech vs. PCC" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Caltech shows more rapid NDVI decline than surrounding residential and commercial areas.
</div>

---

## Isolating Caltech’s Landscaping Impacts

To isolate green cover loss due to landscaping versus construction, we masked buildings on Caltech’s campus and analyzed remaining NDVI. Even excluding new buildings, we observe a median NDVI drop of -0.057, suggesting that drought-tolerant landscaping may lower NDVI due to its biophysical characteristics.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="/assets/img/pasadenaNDVI/4.png" title="Masked Caltech NDVI Trends" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  NDVI drop persists in non-building areas, suggesting a role for drought-tolerant landscaping in green cover decline.
</div>

---

## Discussion and Future Directions

NDVI is a powerful remote sensing metric, but it may not fully capture urban greening when plant species shift toward drought-tolerant types. These plants often have waxy or sparse foliage, resulting in lower NDVI values even if biomass remains. Pasadena’s 2015 Model Water Efficient Landscape Ordinance (MWELO) encouraged this shift. At Caltech, nearly 25% of landscaping has transitioned to drought-tolerant alternatives.

### Limitations of NDVI

NDVI's sensitivity to chlorophyll content and leaf density makes it imperfect for assessing changes in urban landscaping styles. Future research should integrate ground-truthing and alternative vegetation indices.

### The Urban Greening Balance

Pasadena and institutions like Caltech must balance water efficiency with green space aesthetics and thermal benefits. Native plant diversity, mixed-plant palettes, and targeted use of conventional species in water-rich zones offer one path forward.

---

## Conclusion

Urban development and sustainable landscaping are reshaping Pasadena’s green infrastructure. NDVI data suggest a decline in green cover, driven both by construction and by a shift to lower-reflectance drought-tolerant plants. To preserve environmental and social benefits, Pasadena should integrate green infrastructure planning into future development. Caltech has an opportunity to lead this transformation by incorporating living labs, green roofs, and community-driven greening programs into its campus strategy.
