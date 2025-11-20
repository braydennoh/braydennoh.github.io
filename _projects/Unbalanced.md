---
layout: page
title: Unbalanced River
description: A Python implementation of Meade (2010)
importance: 994
category: project
giscus_comments: false
---

This is a Python implementation of the unbalanced  mountain building model proposed by [Brendan Meade (2010)](https://pubs.geoscienceworld.org/gsa/geology/article-abstract/38/11/987/130140/The-signature-of-an-unbalanced-earthquake-cycle-in). 

In an ideal sense, the long term uplift of a thrust system should reflect the combined effects of interseismic and coseismic deformation, which I will refer to as a balanced system. In a simple thrust fault geometry, the cumulative uplift forms a broad block that settles into a characteristic concave bedrock river profile predicted by the stream power equation. But imagine if the coseismic events, for some reason, never catch up to the timescale over which a river adjusts its channel slope. 

To picture this, place a river on top of a thrust system where the coseismic slip never releases. At the depth where deformation shifts from brittle failure to creeping flow, the interseismic deformation alone generates a narrow zone of uplift. The bedrock river that carves across this landscape will not show the usual concavity. Instead, it will carry the imprint of this localized rise, a bulge rather than a concave curve.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
         path="/assets/img/rampislocked/riverbalance1.gif" 
         title="Balanced River" 
         class="img-fluid"
         style="border:none; box-shadow:none; padding:0; margin:0; border-radius:0;" 
    %}
  </div>
</div>


<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
         path="/assets/img/rampislocked/unbalance.png" 
         title="Balanced River" 
         class="img-fluid"
         style="border:none; box-shadow:none; padding:0; margin:0; border-radius:0;" 
    %}
  </div>
</div>
