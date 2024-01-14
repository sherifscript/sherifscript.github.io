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

When it comes to online Sankey diagrams online, most seem to originate from specific sources, with sankeymatic.com being the most popular. This site offers a user-friendly and straightforward interface for constructing Sankey diagrams and provides near-real-time rendering. However, this convenience comes at the cost of limited aesthetic customizatio unless an external graphic editor is used. In my experience, the most visually appealing method for creating Sankey diagrams is through Figma. 

<h4>Figma</h4>
If you have experience with Figma, you’d know that it's a web-based design platform more popular among web and mobile app developers than data analyists as its primairy use is for desining user interfaces. It is renowned for its aesthetic, user-friendly interface, as well as its ability to allow community-contributed plugins, akin to Python libraries, makes it a versatile tool for beautiful data visualizations. One standout plugin on Figma caight my eye in search for uncomplicated Sankey diagram solution, simply named '<a href ="https://www.figma.com/community/plugin/1159893716343028026">Sankey</a>' by the Genuine Impact Team, is a reliable source for creating data visualizations.

If you have experience with Figma, you’d know that it is a tool used for mainly designing user interfaces and a populat tool . It’s web-based and allows multiple people to work on a design simultaneously. 

By following the quick tutorial of the plugin, anyone could start building up great Sankey diagrams with unlimited aesthitical options (being the main feture of using Figma) in under 10 minutes! I was inpired bya 
<div class="image-wrapper">
    <img src="/assets/images/Germany-2022-Imports-Exports.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Germany's Imports & Exports in 2022 made with Excel, Figma.</p>
</div>

<div class="image-wrapper">
    <img src="/assets/images/umg-income-2022.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Income Statement for Universal Music Group in the FY 2022 made with Excel, Figma.</p>
</div>

<h4>Python</h4>
Python, a staple in data analysis and science, also supports the creation of Sankey diagrams, though it might not be the primary choice for these types of visualizations. Python’s rich ecosystem includes numerous visualization packages like Seaborn, Altair, Plotly, and Matplotlib, among others, catering to a wide array of needs, each with its own nifty tricks and features. With just a few lines of code, one can produce stunning and thought-provoking visualizations. However, when it comes to Sankey diagrams, like any coding solution to this visualization, using Python is becomes slightly complicated. This comes from the fact that there is no universal way of creating Sankey diagrams in visualization libraries, with each library taking in the data in a slightly different format.

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

The only quirkc I have about this method is some kind of error that will pop up if you attempy yo insert a period (.) in the label of the diagram. For example, using "U.S." instead of "US" will immediately tyhrow an error. Will have to circle back to that. 
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
      <p class="your-caption-class">FY22 Income Statement for Warner Music using Holoviews.</p> 
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
      <p class="your-caption-class">FY22 Income Statement for Warner Music using Plotly.</p> 
</div>
