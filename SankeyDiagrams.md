---
layout: post
tiletitle: Sankey Diagrams
title: "Sankey Diagrams: Trading Trends, P&L Charts, National Budgets and more"
toolsused: Python, Excel, Figma
description: A most vertaile yet rare visualization, Trading Trends, P&L Charts, National Budgets and more
image: assets/images/Germany-2022-Imports-Exports.png
nav-menu: false
show_tile: false
---
Sankey diagrams are unique among popular visualizations due to their varied construction across different platforms. For instance, in R, the open-source library ggsankey, available on GitHub, adopts the widely appreciated 'grammar of graphics' concept for its simplicity. Conversely, in Python, Plotly is often preferred for creating Sankey diagrams. Tableau, as mighty as it is, seems to have never had the option available on their desktop platform, instead, it is neatly hidden in their beta visualizations section only on the web version. This limitation makes sense considering Tableau's primary focus as a GUI-based visualization tool, rather than a tool for data manipulation, which is crucial for fitting data into the unique format of Sankey diagrams."

"When it comes to online Sankey diagrams, most seem to originate from specific sources, with sankeymatic.com being the most popular. This site offers a user-friendly and straightforward interface for constructing Sankey diagrams and provides near-real-time rendering. However, this convenience comes at the cost of limited aesthetic customization unless an external graphic editor is used. In my experience, the most visually appealing method for creating Sankey diagrams is through Figma. 

<h4>Figma</h4>
Figma, a canvas-based design platform popular more popular among web and mobile app developers than data analyists , is renowned for its aesthetic, user-friendly interface. Its ability to allow community-contributed plugins, akin to Python libraries, makes it a versatile tool for beautiful data visualizations. One notable Sankey plugin on Figma, simply named '<a href ="https://www.figma.com/community/plugin/1159893716343028026">Sankey</a>' by the Giotteam, is a reliable source for creating data visualizations."

<div class="image-wrapper">
    <img src="/assets/images/Germany-2022-Imports-Exports.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Germany's Imports & Exports in 2022 made with Excel, Figma.</p>
</div>

<div class="image-wrapper">
    <img src="/assets/images/umg-income-2022.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Income Statement for Universal Music Group in the FY 2022 made with Excel, Figma.</p>
</div>

<h4>Python</h4>
Python, a staple in data analysis and science, also supports the creation of Sankey diagrams, though it might not be the primary choice for these types of visualizations. Python's rich ecosystem includes numerous visualization packages like Seaborn, Altair, Plotly, and Matplotlib, catering to a wide array of needs for data professionals. With just a few lines of code, one can produce stunning and thought-provoking visualizations, each package offering its unique approach and capabilities. However, when it comes to Sankey diagrams, like any coding solution to this visualization, using Python is inherenrtly complicarted


<pre><code class="language-python">
import plotly.graph_objects as go

# Define node labels (each category in the financial statement)
labels = [
    "Digital", "Physical", "Licensing & Other",  # Revenue sources
    "Recorded Music", "Music Publishing",  # Revenue classifications
    "Digital publishing", "Performance", "Synchronization", "Mechanical", "Other",  # Publishing details
    "Total Revenue",  # Total Revenue
    "Operating expenses", "Cost of revenue", "Selling, general and administrative expenses", 
    "Amortization and impairment losses on intangible assets", "Loss from equity affiliates",  # Expenses
    "Operating income", "Other income", "Financial Expenses",  # Income calculations
    "Pre-tax income", "Income tax", "Net profit",  # Profit calculations
    "Merchandising & Other", "Intersegment eliminations"  # Other income details
]

# Define source and target indices for the nodes
source = [0, 1, 2, 0, 3, 4, 4, 4, 4, 4, 3, 3, 7, 8, 8, 8, 8, 8, 13, 14, 15, 16, 18, 18, 19]
target = [3, 3, 3, 4, 7, 7, 7, 7, 7, 7, 12, 13, 13, 13, 13, 13, 13, 13, 14, 15, 16, 17, 19, 20, 20]
value  = [5.7, 1.2, 1.1, 1.0, 1.79, 1.0, 0.371, 0.236, 0.097, 0.055, 10.3, 8.74, 5.75, 2.7, 0.258, 0.002, 1.6, 0.915, 0.735, 0.9, 0.115, 0.785, 0.618, 0.014, 0.785]

# Define the figure
fig = go.Figure(data=[go.Sankey(
    node=dict(
      pad=15,
      thickness=20,
      line=dict(color="black", width=0.5),
      label=labels
    ),
    link=dict(
      source=source,
      target=target,
      value=value
    ))])

fig.update_layout(title_text="Universal Music Group FY22 Income Statement", font_size=10)
fig.show()

</code></pre>


<div class="image-wrapper">
    <img src="/assets/images/Germany-2022-Imports-Exports.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Germany's Imports & Exports in 2022 made with Excel, Figma.</p>
</div>

<p>
The German economy produced a positive net trade surplus in 2022 totaling over 82 billionn euros. The United States were Germany's largest trading partner in 2022 with a nearly 64 billion euros in trade surplus with Germany. France was Germany's second largest trading partner that year, with exports to the country amounting to 116 billion euros. The visualization clearly shows that Europe remained the region where most of GErmany's imports and exports are traded.

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


<p>
For those in pursuit of visual excellence, Figma emerges as an unexpected yet potent tool for creating Sankey diagrams. Primarily a canvas-based design platform, Figma is a favorite among web and mobile application developers. Its emphasis on aesthetic appeal, user-friendly UI, and the ability to incorporate community-contributed plugins make it a versatile choice for stunning data visualizations. A noteworthy mention is the Sankey plugin by Giotteam, offering a reliable and visually appealing method to create Sankey diagrams.
</p>



<pre><code class="language-python">
import plotly.graph_objects as go

# Define node labels (each category in the financial statement)
labels = [
    "Digital", "Physical", "Licensing & Other",  # Revenue sources
    "Recorded Music", "Music Publishing",  # Revenue classifications
    "Digital publishing", "Performance", "Synchronization", "Mechanical", "Other",  # Publishing details
    "Total Revenue",  # Total Revenue
    "Operating expenses", "Cost of revenue", "Selling, general and administrative expenses", 
    "Amortization and impairment losses on intangible assets", "Loss from equity affiliates",  # Expenses
    "Operating income", "Other income", "Financial Expenses",  # Income calculations
    "Pre-tax income", "Income tax", "Net profit",  # Profit calculations
    "Merchandising & Other", "Intersegment eliminations"  # Other income details
]

# Define source and target indices for the nodes
source = [0, 1, 2, 0, 3, 4, 4, 4, 4, 4, 3, 3, 7, 8, 8, 8, 8, 8, 13, 14, 15, 16, 18, 18, 19]
target = [3, 3, 3, 4, 7, 7, 7, 7, 7, 7, 12, 13, 13, 13, 13, 13, 13, 13, 14, 15, 16, 17, 19, 20, 20]
value  = [5.7, 1.2, 1.1, 1.0, 1.79, 1.0, 0.371, 0.236, 0.097, 0.055, 10.3, 8.74, 5.75, 2.7, 0.258, 0.002, 1.6, 0.915, 0.735, 0.9, 0.115, 0.785, 0.618, 0.014, 0.785]

# Define the figure
fig = go.Figure(data=[go.Sankey(
    node=dict(
      pad=15,
      thickness=20,
      line=dict(color="black", width=0.5),
      label=labels
    ),
    link=dict(
      source=source,
      target=target,
      value=value
    ))])

fig.update_layout(title_text="Universal Music Group FY22 Income Statement", font_size=10)
fig.show()

</code></pre>
