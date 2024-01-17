---
layout: post
tiletitle: Sankey Diagrams
title: "Sankey Diagrams: Trading balances, income statements, national budgets and more"
toolsused: Python, Excel, Figma, Power BI
description: A most verstaile yet rare visualization. This post documents a deep dive into the world of Sankey diagrams showcasing multiple tools and different use cases!
image: assets/images/Germany-2022-Imports-Exports.png
nav-menu: false
show_tile: false
---
Sankey diagrams are unique among popular visualizations due to their varied construction across different platforms. 

In my experience, the most visually appealing method for creating Sankey diagrams is through Figma. 
<h4>GUI-based solutions with Power BI & Figma</h4>
<i><b>Figma</b></i><br>
If you have experience with Figma, you’d know that it's a web-based design platform more popular among web and mobile app developers than data analysts as its primary use is for designing user interfaces. It is renowned for its aesthetic, user-friendly interface, as well as its ability to allow community-contributed plugins, akin to Python libraries, makes it a versatile tool for beautiful data visualizations. 

A notable mention is the '<a href ="https://www.figma.com/community/plugin/1159893716343028026">Sankey</a>' plugin by the Genuine Impact Team, a gem I stumbled upon while searching for an uncomplicated Sankey diagram solution. My project involved visualizing Germany's 2022 trade balance, with data sourced from the <a href = "https://www.destatis.de/EN/Themes/Economy/Foreign-Trade/Tables/order-rank-germany-trading-partners.pdf?__blob=publicationFile">German Federal Statistical Office</a>. This project, although time-consuming due to the data's volume, was remarkably straightforward, thanks to Figma. The platform's UI-centric design allows for immense customization, enabling me to enrich the visualization with graphics and flags, all within the same workspace!

<div class="image-wrapper">
    <img src="/assets/images/Germany-2022-Imports-Exports.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Germany's Imports & Exports in 2022 made with Excel & Figma.</p>
</div>

By following the quick tutorial of the plugin, anyone could start building up great Sankey diagrams with unlimited aesthetical options in under 10 minutes!

<i><b>Power BI</b></i><br>
Despite my familiarity with Tableau, an elegant data visualization tool, I’ve been eager to give Microsoft’s Power Bi a shot. I mean, I’ve been using Microsoft Office products forever, right? So, it was pretty thrilling to choose Power Bi as the GUI tool for this project. Also, it didn't help that Tableau removed the ability to create Sankey diagrams completelty from their plaform. Tableau, as mighty as it is, seems to have never had the option available on their desktop platform, instead, it was offered briefly hidden in their beta visualizations section only on the web version. Let’s see how it goes!

At first, the UI seemed pretty intutive to me after years using MS Office products, but then it took me longer to understand where everything was. After a little diggin around, I finally managed to get a grip on how to approach such a project. I run into my first obstacle very quickly, which is that you need a work or university account that used Microsoft’s professional cloud services to download Microsoft’s plugin from the Power BI cloud plugin libraries. Luckily, I still had access from my old university!
After downloading the plugin, the process was extremely easy; just add in the start and end points of each flow and their values, and et voila! A diagram is ready. Unfortunately, however, embedding the diagram interactively it in this post was not possible as my school account didn’t have the necessary permissions 😔 Alas, I was able to export an image. 

<div class="image-wrapper">
    <img src="/assets\images\Ukraine Aid 2023.jpg" class="your-image-class" alt="Description">
    <p class="your-caption-class">Ukraine Aid Visualized in Power BI, as of October 2023. <a href ="https://www.cfr.org/article/how-much-aid-has-us-sent-ukraine-here-are-six-charts">Data accessed January 2024</a>.</p>
</div>

<h4>Python</h4>
Python, a staple in data analysis and science, also supports the creation of Sankey diagrams, though it might not be the primary choice for these types of visualizations. Python’s rich ecosystem includes numerous visualization packages like Seaborn, Altair, Plotly, and Matplotlib, among others, catering to a wide array of needs, each with its own nifty tricks and features. With just a few lines of code, one can produce stunning and thought-provoking visualizations. However, when it comes to Sankey diagrams, like any coding solution to this visualization, using Python for it makes it slightly complicated. This comes from the fact that there is no universal way of creating Sankey diagrams in visualization libraries, with each library taking in the data in a slightly different format.

For this illustration, I’ve chosen to work with Plotly and Holoviews. The reason is simple: interactivity. Sankey diagrams can get crowded very quickly depending on the levels of nodes. Interactivity provides a neat solution to this crowdness by enabling users to navigate the diagram effortlessly. Although slightly different in the format they take, generally, to build a Sankey using either Plotly or Holoviews, you’d need three elements: source, target, and flow value or volume.

Let's load up the libaaries! Pandas comes in first as it'll be needed to import out dataset from an excel file. Then, we import Plotly and Holoviews to the project
<pre><code class="language-python">import pandas as pd
import plotly
import plotly.graph_objects as go
import holoviews as hv 
from holoviews import opts 
hv.extension("bokeh)
</code></pre>

<i><b>1. Holoviews</b></i><br>
Holoviews' required input format is fairly simple. It takes three columns; source, target, and value. 

The only issue thaat I have with this method is some kind of error that will pop up if you attempy yo insert a period (.) in the label of the diagram. For example, using "U.S." instead of "US" will immediately throw an error. Will have to circle back to that. 
<div class="image-wrapper">
    <img src="/assets\images\warner_holoviews_data.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Warner Music FY22 dataset.</p>
</div>

<pre><code class="language-python">holo_data = pd.read_excel(r"D:\Portfolio\Projects\UMG vs Warner Music vs Sony Music\Holoviews.xlsx")
sankey = hv.Sankey(holo_data, label=r"Warner Music FY 22 (in million US dollars)")
sankey.opts(label_position='left', edge_color='target', node_color='index', cmap='tab20', width=750 ,height=600)
</code></pre>

<div class="image-wrapper">
      <iframe src="/assets/sankey_diagram.html" width="100%" height="610" position =absolute></iframe>
      <p class="your-caption-class">Warner Music FY22 Income Statement using Holoviews.</p> 
</div>

<i><b>2. Plotly</b></i><br>
To achieve the same with plotly, this is where things get a bit more tricky, and a bit more than a bit long. [Explain]. Unlike Holoview's required input, there is also no neat way to fit this into an excel file.

<pre><code class="language-python">
data = {
    'source': [
        "Digital", "Artist services and expanded-rights", "Physical", "Licensing", 
        "Digital Publishing", "Synchronization", "Performance", "Mechanical", "Other", 
        "Recorded Music", "Music Publishing", "Revenue", "Revenue", "Revenue", 
        "Operating income (loss)", "Other income (expense), net", "Operating expenses", 
        "Operating expenses", "Operating expenses", "Pre-tax and interest income (EBIT)", 
        "Pre-tax and interest income (EBIT)", "Pre-tax and interest income (EBIT)", 
        "Pre-tax and interest income (EBIT)"
    ],
    'target': [
        "Recorded Music", "Recorded Music", "Recorded Music", "Recorded Music", 
        "Music Publishing", "Music Publishing", "Music Publishing", "Music Publishing", 
        "Music Publishing", "Revenue", "Revenue", "Operating income (loss)", 
        "Operating expenses", "Intersegment eliminations", "Pre-tax and interest income (EBIT)", 
        "Pre-tax and interest income (EBIT)", "Cost of revenue", 
        "Selling, general and administrative expenses (a)", "Amortization expense", 
        "Net profit", "Income tax expense", "Interest expense, net", 
        "Income to non-controlling interest"
    ],
    'value': [
        3305, 767, 563, 331, 
        563, 172, 159, 50, 14, 
        4966, 958, 714, 5205, 5, 
        865, 151, 3080, 1862, 263, 
        551, 185, 25, 4
    ]
}

# Convert the data to a DataFrame
df = pd.DataFrame(data)

# Create a list of unique nodes
nodes = list(set(df['source']).union(set(df['target'])))

# Create mappings to indices for source and target
source_indices = [nodes.index(src) for src in df['source']]
target_indices = [nodes.index(tgt) for tgt in df['target']]

# Prepare the data for Plotly
plotly_data = {
    'node': {'label': nodes},
    'link': {
        'source': source_indices,
        'target': target_indices,
        'value': df['value'].tolist()
    }
}

fig = go.Figure(data=[go.Sankey(
    node = plotly_data['node'],
    link = plotly_data['link']
)])
fig.update_layout(title_text="<b>Warner Music FY22 Income Statement (in million U.S. dollars)</b>", title_x=0.5, title_font_family="Calibri", title_font_size=24)
fig.show()
</code></pre>

<div class="image-wrapper">
      <iframe src="/assets/plotly_sankey.html" width="100%" height="610" position =absolute></iframe>
      <p class="your-caption-class">Warner Music FY22 Income Statement using Plotly.</p> 
</div>

Overall, coding a Sankey diagram in Python can be more challenging than creating other types of visualizations. However, the complexity of the process doesn’t detract from the enjoyment of the journey! Similarly, you can use R to create Sankey diagrams. The open-source library ggsankey, available on GitHub, leverages the "grammar of graphics" concept, which is widely appreciated for its simplicity.

<h4>Online Sankey builders</h4>

I coulldn't bring this post properly to its end without discsusing online Sankey builders. Most of the Sankey diaghrams I've seem online seem to have been made using different online platoforms rather than a specfic tool, which represents a unique phenomenon in the world of data visualizations.

When it comes to online Sankey diagrams online, most seem to originate from specific sources, with <a href ="sankeymatic.com">sankeymatic.com</a> being the most popular. This site offers a user-friendly and straightforward interface for constructing Sankey diagrams and provides near-real-time rendering. However, this convenience comes at the cost of limited aesthetic customizatio unless an external graphic editor is used. 

Another tool I've recently discoevered online was one with a fascinating story. A redditor by the name <a href="https://www.reddit.com/r/SideProject/comments/108omx5/i_created_a_tool_to_visualize_income_statements/">u/IncomeStatementGuy</a> published a side project they’d been working on about a year ago which was a simple tool; for visualizing Sankey diagrams with a simple user interface that allows for an easy manipulation of all fields such as currency suffixes or dates with seamless transformations. The <a href="https://www.sankeyart.com/">side project has now taken off and used by multiple renowned and globally known corporations</a>, highlighting the demand of income statement Sankey diagrams.
