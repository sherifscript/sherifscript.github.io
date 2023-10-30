---
layout: post
tiletitle: Sankey Diagrams
title: "Sankey Diagrams: Trading Trends, P&L Charts, National Budgets and more"
toolsused: Python, Excel, Figma
description: A most vertaile yet rare visualization, Trading Trends, P&L Charts, National Budgets and more
image: assets/images/Germany-2022-Imports-Exports.png
nav-menu: false
---
<p>
    Sankey diagrams stand out as a unique and fascinating approach to data visualization, capturing the attention of enthusiasts and professionals alike. Their distinct style and ability to illustrate flow and distribution set them apart from other visualization tools. In this blog post, we will delve into the world of Sankey diagrams, exploring their construction, popular sources, and creative applications.
</p>

<div class="image-wrapper">
    <img src="/assets/images/Germany-2022-Imports-Exports.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Germany's Imports & Exports in 2022 made with Excel, Figma.</p>
</div>

<p>
    At their core, Sankey diagrams are flow diagrams where the width of the arrows or lines is proportional to the flow quantity they represent. They are incredibly efficient at showcasing the distribution of resources, energy, or information, providing a clear and concise view of complex systems.
</p>

<header class="major">
    <h3>Building Sankey Diagrams: A Platform Overview</h3>
</header>

<p>
    The construction of Sankey diagrams varies significantly across different platforms, each bringing its unique approach to the table. In R, the 'ggsankey' library, available on GitHub, is a popular choice. It embraces the simplicity of R’s grammar of graphics, providing users with a straightforward and user-friendly experience. On the other hand, Python enthusiasts often turn to Plotly, renowned for its relative ease of use and robust functionality.
</p>
<p>
    Tableau, despite its prowess in the visualization arena, has been slow to adopt Sankey diagrams on its desktop platform. Instead, they are tucked away in the beta visualizations section of the web version. This choice reflects Tableau's primary focus as a GUI visualization tool, with less emphasis on data manipulation, a critical component for crafting Sankey diagrams. 
</p>

<p>
Unlike other visualizations, Sankey diagrams often trace back to specific sources. One of the most notable is sankeymatic.com, a platform celebrated for its user-friendly interface and near real-time rendering capabilities. While it offers simplicity and ease, it does limit aesthetic customization, unless users are willing to involve an external graphic editor.
</p>

<div class="image-wrapper">
    <img src="/assets/images/umg-income-2022.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Income Statement for Universal Music Group in the FY 2022 made with Excel, Figma.</p>
</div>

<!-- <div class="image-container">
    <div class="image-wrapper">
        <img src="/assets/images/umg-income-2022.png" class="your-image-class" alt="Description for first image">
        <p class="your-caption-class">Income Statement for Universal Music Group in the FY 2022 made with Excel, Figma.</p>
    </div>
    <div class="image-wrapper">
        <img src="/assets/images/warner-income-2022.png" class="your-image-class" alt="Description for second image">
        <p class="your-caption-class">Income Statement for Warner Music in the FY 2022 made with Excel, Figma.</p>
    </div>
    <div class="image-wrapper">
        <img src="/assets/images/sony-income-2022.png" class="your-image-class" alt="Description for second image">
        <p class="your-caption-class">Income Statement for Warner Music in the FY 2022 made with Excel, Figma.</p>
    </div>
</div> -->


<p>
For those in pursuit of visual excellence, Figma emerges as an unexpected yet potent tool for creating Sankey diagrams. Primarily a canvas-based design platform, Figma is a favorite among web and mobile application developers. Its emphasis on aesthetic appeal, user-friendly UI, and the ability to incorporate community-contributed plugins make it a versatile choice for stunning data visualizations. A noteworthy mention is the Sankey plugin by Giotteam, offering a reliable and visually appealing method to create Sankey diagrams.
</p>


<p>
    In Germany, the 3D visualization showcases dense population centers in cities like Berlin, Munich, and Hamburg. The varying heights give a sense of urban concentration while valleys hint at less populated rural regions. This visualization reiterates Germany's status as a major European hub with a spread-out urban landscape.
</p>

<p>
    I made this in R using the Rayshader package for mapping and Adobe Illustrator for texts and labels. <a href="https://data.humdata.org/dataset/kontur-population-egypt">Data</a> was sourced from the Kontur Population Dataset 2022. This dataset estimates the worldwide population in 400m hexagonal geometries using a combination of "GHSL, Facebook, Microsoft Buildings, Copernicus Global Land Service Land Cover, Land Information New Zealand, and OpenStreetMap data." The map is presented at an angle to better illustrate heights.
</p>

<!-- New Section: Discussing the Code -->
<section>
    <header class="major">
        <h3>Behind the Scenes: Crafting the 3D Maps</h3>
    </header>
    <p>
        The journey from raw data to interactive 3D maps is a fascinating process, involving a blend of data manipulation, artistic flair, and technical prowess. Let’s delve into the code and methodologies that brought these visualizations to life.
    </p>
    <p>
        The process begins with loading the necessary libraries and the Kontur Population data. The data is then transformed into a matrix, which serves as the foundation for the 3D rendering. A color palette is generated to enhance the visual appeal and provide additional depth to the visualization.
    </p>
    <!-- Preformatted Code: R Code Snippet -->
    <!-- <h3>Preformatted</h3> -->
    <pre><code class="language-r">
# Load Required Libraries
library(sf)
library(tidyverse)
library(stars)
library(rayshader)
library(MetBrewer)
library(colorspace)

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
        With the data prepared, Rayshader takes the stage, turning our matrix into a stunning 3D model. Camera angles are adjusted to provide the best view, and the final render is saved as a PNG image.
    </p>
    <!-- Preformatted Code: R Code Snippet -->
    <!-- <h3>Preformatted</h3> -->
    <pre><code class="language-r">
# Create 3D Plot using Rayshader
mat |> height_shade(texture = texture) |> 
plot_3d(heightmap = mat, zscale = 200/5, solid = F, 
shadowdepth = 0)

# Adjust Camera Angles and Render Plot
render_camera(theta = -20, phi = 45, zoom = 0.8)
render_highquality(filename = 'images\\final_plot.png', ...)
</code></pre>
</section>

<p>
    The initial spark for this project came from a desire to make data more tangible and relatable. Population density figures are often sterile and hard to grasp. By rendering them in 3D, I hoped to provide a fresh perspective on the living patterns across two diverse geographical and cultural landscapes.
</p>

<p>
    The end result is a set of interactive 3D maps that invite exploration and offer a novel way to appreciate population distribution in these two countries. This project was a fulfilling blend of analysis, creativity, and technical learning. It also opened up ideas for future projects that can further bridge the gap between data analysis and visual storytelling.
</p>

<p>
    The journey from raw data to interactive visuals was both challenging and exhilarating. It underscored the potential of modern tools to turn numbers into narratives. In the future, I plan to extend this approach to other types of geographic and demographic data, and to explore additional tools and platforms for 3D visualization.
</p>

<p>
    I invite you to explore the 3D maps and would love to hear your feedback and ideas. This project is a reminder of the boundless possibilities at the intersection of data, technology, and art.
</p>

<p>
    This project was a venture into the visual realm of data, a reminder that behind every data point, there's a story waiting to be told. I'm excited about the road ahead, as every project is a stepping stone to new learning, new insights, and new stories to share. 
    <br><br>
    The full project can be found on <a href="https://github.com/sherifscript/RayshaderMaps">GitHub</a> with some other graphics.
</p>