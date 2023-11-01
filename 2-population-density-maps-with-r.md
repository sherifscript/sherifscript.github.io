---
layout: post
tiletitle: A 3D Look at Egypt & Germany
title: "Visual Journeys Across Egypt and Germany: A 3D Perspective"
toolsused: R, Adobe Illustrator
description: Egypt's visualization distinctly highlights the historic concentration of the Egypt state along the Nile River, a lifeline for the nation, with most of its population residing along its banks. 
image: assets/images/egyptR.png
nav-menu: false
---
<p>
    The initial spark for this project came about from my love of visualization and maps. Population density figures are often sterile and hard to grasp. By rendering them in 3D, I hoped to provide a simple yet aesthetically-pleasing perspective on the living patterns across two diverse geographical and cultural landscapes, both of which were important to me on a personal level.
</p>

<p>
    The end result is a set of interactive 3D maps that invite exploration and offer a novel way to appreciate population distribution in these two countries (try it yourself!). This project was a fulfilling blend of analysis and technical learning. A little codepeak is included in the next section.
</p>

<div class="image-wrapper">
    <img src="/assets/images/egyptR.png" class="your-image-class" alt="3D Population Density Map of Egypt">
    <p class="your-caption-class">3D Population Density Map of Egypt in 2022 using the Rayshader package in R.</p>
</div>

<p>
    As the capital city and the largest city in Egypt, Cairo's dense population is distinctly represented by a tall and concentrated spike in the map. The Nile Delta region, especially areas around cities like Alexandria and Port Said, show significant population density. The visualization distinctly highlights the historic concentration of the Egypt state along the Nile River, a lifeline for the nation, with most of its population residing along its banks. 
    
</p>
<p>
    Other notable spikes are observed in coastal areas like Marsa Matruh and Hurghada, which are popular cities and tourist destinations. Locations such as Siwa Oasis and Kharga Oasis, although smaller, are distinct and histroical; Alexander the Great was crowned Pharoah of Egypt in Siwa. These oases have historically been vital habitats in the desert landscape. Desert Regions: The map uses a muted beige color as the base, reminiscent of Egypt's vast desert landscapes, as well as the Riq'ah scricpt to refelct the most commnly used script in everyday Egyptian life.
</p>

<div class="image-wrapper">
    <img src="/assets/images/germanyR.png" class="your-image-class" alt="3D Population Density Map of Germany">
    <p class="your-caption-class">Population Density Map of Germany in 2022.</p>
</div>

<p>
    In Germany, the 3D visualization showcases dense population centers in cities like Berlin, Munich, and Hamburg. The varying heights give a sense of urban concentration while valleys hint at less populated rural regions. This visualization reiterates Germany's status as a major European hub with a spread-out urban landscape. An interestring observation is seemingly empty semi-circle region of lands surrounding Berlin. There is no single main reason for this phenemnon but there are multiple theories aiming to explain it. The first being that Berlin naturally lies in a swamp
</p>

<p>
    I made this in R using the Rayshader package for mapping and Adobe Illustrator for texts and labels. <a href="https://data.humdata.org/dataset/kontur-population-egypt">Data</a> was sourced from the Kontur Population Dataset 2022. This dataset estimates the worldwide population in 400m hexagonal geometries using a combination of "GHSL, Facebook, Microsoft Buildings, Copernicus Global Land Service Land Cover, Land Information New Zealand, and OpenStreetMap data." The map is presented at an angle to better illustrate heights.
</p>

<!-- New Section: Discussing the Code -->
<header class="major">
    <h3>Behind the Scenes: Crafting the 3D Maps</h3>
</header>

<p>
    The journey from raw data to interactive 3D maps is a fascinating process, involving a blend of data manipulation, artistic flair, and technical prowess. Let’s delve into the code and methodologies that brought these visualizations to life using Egypt as an example.
</p>
<p>
    The process begins with loading the necessary libraries and the <a href="https://data.humdata.org/dataset/kontur-population-egypt">Kontur Population 2022</a> data. The data is then transformed into a matrix, which serves as the foundation for the 3D rendering. I chose the color pallete by <a href="https://github.com/BlakeRMills/MetBrewer">Met Brewer</a> for my love of renaissance art and Mat's ability to encapsulate all sorts of  palletes from different artistics movements.  For Egypt, the color "Greek" presented a beautiful choice to reflect Egypt's vast beige deserts and intense density reds. The colors were further enhanced by <code class="language-r">colorRampPalette</code> to give it more depth. The colors not only make the visualization appealing but also help in distinguishing population density variations.
<!-- Preformatted Code: R Code Snippet -->
<pre><code class="language-r"># Load Required Libraries
library(sf) #handling spatial data
library(tidyverse)
library(rayshader)
library(MetBrewer)

# Load Kontur Data
data <- st_read("kontur_population_EG_20220630.gpkg")

# Data Conversion: Spatial Data to Matrix
size = 5000
rast <- st_rasterize(data, nx=floor(size*w_ratio), 
                     ny=floor(size*h_ratio))
mat <- matrix(data=rast$population, nrow =floor(size*w_ratio), 
              ncol =floor(size*h_ratio))

# Generate Color Palette using MetBrewer
c1 <- met.brewer('Greek')
texture <- grDevices::colorRampPalette(c1, bias=2)(256)
</code></pre>			

<p>
    With the data prepared, <a href="https://www.rayshader.com/">Rayshader</a> takes the stage, turning our matrix into a stunning 3D plot using the <code class="language-r">plot_3d()</code> function from the rayshader package. Parameters like <code class="language-r">zscale</code>, <code class="language-r">solid</code>, and <code class="language-r">shadowdepth</code> determine the visual characteristics of the plot, such as the elevation scaling and shadow effects. Camera angles are adjusted to provide the best view, and the final render is saved as a PNG image.
</p>

<!-- Preformatted Code: R Code Snippet -->
<pre><code class="language-r"># Create 3D Plot using Rayshader
mat |> height_shade(texture = texture) |> 
plot_3d(heightmap = mat, zscale = 200/5, solid = F, 
        shadowdepth = 0)

# Adjust Camera Angles and Render Plot
render_camera(theta = -20, phi = 45, zoom = 0.8)
render_highquality(filename = 'images\\final_plot.png', ...)
</code></pre>




<p>
In this project, I tried to bring together data analysis, geospatial analysis, and graphic design. One of the standout features is the meticulous care taken in aspect ratio handling and color palette generation, ensuring the final 3D plot is not only accurate but also visually compelling. Another interesting aspect is the seamless integration of spatial functions with 3D rendering capabilities, showcasing the power of R in handling diverse tasks.
</p>

<p>
    I invite you to explore the 3D maps and would love to hear your feedback and ideas. This project is a reminder of the boundless possibilities at the intersection of data, technology, and art.
</p>

<p>
    This project was a venture into the visual realm of data, a reminder that behind every data point, there's a story waiting to be told. I'm excited about the road ahead, as every project is a stepping stone to new learning, new insights, and new stories to share. 
    <br><br>
    The full project can be found on <a href="https://github.com/sherifscript/RayshaderMaps">GitHub</a> with some other graphics.
</p>