---
layout: post
tiletitle: Sankey Diagrams
title: "Sankey Diagrams: Trading balances, income statements, national budgets and more"
toolsused: Python, Excel, Figma, Power BI
description: A most versatile yet rare visualization. This post documents a deep dive into the world of Sankey diagrams showcasing multiple tools and different use cases!
image: assets/images/Germany-2022-Imports-Exports.png
nav-menu: false
show_tile: true
---

In an era where data is king, the ability to effectively visualize complex information is a skill of paramount importance. The Sankey Diagram, a specific type of flow diagram, has emerged as a vital tool in this realm, offering a unique way to illustrate the flow of resources, finances, or information. In this project, I delve into the creation of Sankey Diagrams, exploring various methods and tools ranging from GUI-based applications like Power BI and Figma to coding-based solutions in Python, and even online Sankey builders.

Sankey Diagrams have found their niche in a variety of fields such as trading balances, income statements, and national budgets, to name a few. Their ability to represent both the magnitude and direction of flows in a single, intuitive visualization makes them an invaluable asset in data analysis and financial reporting. In this post I attempt to not only share insights on the practical aspects of creating these diagrams but also reflect on the experiences and challenges encountered using different tools and platforms.

Starting with GUI-based solutions, we explore how tools like Power BI and Figma can be leveraged to create visually appealing and informative Sankey Diagrams. I will discuss the nuances of these platforms, including their strengths and limitations, and provides a hands-on example of visualizing Germany's 2022 trade balance and aid to Ukraine in 2023.

The journey continues with coding-based solutions, particularly focusing on Python, a powerhouse in the field of data analysis. I will explore the use of Python libraries such as Plotly and Holoviews, demonstrating their capabilities in creating interactive and complex Sankey Diagrams. This section is particularly insightful for those who prefer a more hands-on, coding approach to data visualization.

Finally, I'll briefly examine online Sankey builders, highlighting their ease of use and accessibility. It showcases how these tools are democratizing the creation of Sankey Diagrams, making them accessible to a wider audience without the need for specialized software or programming knowledge.

<h4>GUI-based solutions with Power BI & Figma</h4>
<i><b>Figma</b></i><br>
If you have experience with Figma, you’d know that it's a web-based design platform more popular among web and mobile app developers than data analysts as its primary use is for designing user interfaces. It is renowned for its aesthetic, user-friendly interface, as well as its ability to allow community-contributed plugins, akin to Python libraries, making it a versatile tool for beautiful data visualizations. 

A notable mention is the '<a href ="https://www.figma.com/community/plugin/1159893716343028026">Sankey</a>' plugin by the Genuine Impact Team, a gem I stumbled upon while searching for an uncomplicated Sankey diagram solution. My project involved visualizing Germany's 2022 trade balance, with data sourced from the <a href = "https://www.destatis.de/EN/Themes/Economy/Foreign-Trade/Tables/order-rank-germany-trading-partners.pdf?__blob=publicationFile">German Federal Statistical Office</a>. By following the quick tutorial of the plugin, anyone could start building up great Sankey diagrams in Figma with unlimited aesthetical options in under 10 minutes.

<div class="image-wrapper">
    <img src="/assets/images/Germany-2022-Imports-Exports.png" class="your-image-class" alt="Description">
    <p class="your-caption-class">Germany's Imports & Exports in 2022 made with Excel & Figma.</p>
</div>

This Sankey, although time-consuming due to the data's volume, was remarkably straightforward thanks to Figma. The platform's UI-centric design allowed for immense customization, enabling me to enrich the visualization with graphics and flags, all within the same workspace!

<i><b>Power BI</b></i><br>
Despite my familiarity with Tableau, an elegant data visualization tool, I’ve been eager to give Microsoft’s Power Bi a shot. I mean, I’ve been using Microsoft Office products forever, right? So, it was pretty thrilling to choose Power Bi as the GUI tool for this project. Also, it didn't help that Tableau removed the ability to create Sankey diagrams completely from their platform. Tableau, as mighty as it is, seems to have never had the option available on their desktop platform, instead, it was offered briefly hidden in their beta visualizations section only on the web version. Let’s see how it goes!

At first, the UI seemed pretty intuitive to me after years using MS Office products, but then it took me longer to understand where everything was. After a little digging around, I finally managed to get a grip on how to approach such a project. I run into my first obstacle very quickly, which is that you need a work or university account that used Microsoft’s professional cloud services to download Microsoft’s plugin from the Power BI cloud plugin libraries. Luckily, I still had access from my old university!

After downloading the plugin, the process was extremely easy; just add in the start and end points of each flow and their values, and et voila! A diagram is ready. 
I thought it’d be interesting to visualize the aid that Ukraine had received so far since the Russian invasion of 2022. Luckily, this Council on Foreign Relations article providing detailed information on the aid to Ukraine as of October 2023.

<div class="image-wrapper">
    <img src="/assets\images\Ukraine Aid 2023.jpg" class="your-image-class" alt="Description">
    <p class="your-caption-class">Ukraine Aid Visualized in Power BI, as of October 2023. <a href ="https://www.cfr.org/article/how-much-aid-has-us-sent-ukraine-here-are-six-charts">Data accessed January 2024</a>.</p>
</div>

My only issue was that I found Microsoft's Sankey plugin to be lacking in features. The scale settings in particular were not providing the results I wanted. Eventually, I used the scaling option to fir in all the nodes on the canvas, however, the side effect was that the flow sizes coming out of the nodes was not representative of the actual input values. This does not affect the comprehension a lot since the main insights regarding distribution are still readable from the in the current graph, but it is something to take note of. Also, other Sankey plugins in the Microsoft store seem to feature more customization. Embedding the diagram interactively in this post was not possible as my university account didn’t have the necessary permissions 😔 Alas, I was glad with the final outcome and looking forward to use Power BI more in the future!

<h4>Coding-based solutions with Python</h4>
Python, a staple in data analysis and science, also supports the creation of Sankey diagrams, though it might not be the primary choice for these types of visualizations. Python’s rich ecosystem includes numerous visualization packages like Seaborn, Altair, Plotly, and Matplotlib, among others, catering to a wide array of needs, each with its own nifty tricks and features. With just a few lines of code, one can produce stunning and thought-provoking visualizations. However, when it comes to Sankey diagrams, like any coding solution to this visualization, using Python for it makes it slightly complicated. This comes from the fact that there is no universal way of creating Sankey diagrams in visualization libraries, with each library taking in the data in a slightly different format.

For this illustration, I’ve chosen to work with Plotly and Holoviews. The reason is simple: interactivity. Sankey diagrams can get crowded very quickly depending on the levels of nodes. Interactivity provides a neat solution to this clutteredness by enabling users to navigate the diagram effortlessly. Although slightly different in the format they take, generally, to build a Sankey using either Plotly or Holoviews, you’d need three elements: source, target, and flow value or volume.

Let's load up the necessary libraries for this project. Pandas comes in first as it'll be needed to import out dataset from an excel file. Then, we import Plotly and Holoviews to the project
<pre><code class="language-python">import pandas as pd
import plotly
import plotly.graph_objects as go
import holoviews as hv 
from holoviews import opts 
hv.extension("bokeh)
</code></pre>

<i><b>Holoviews</b></i><br>
Holoviews' required input format is fairly simple and is identical to how Pwer BI's required data format was. It takes three columns; source, target, and value. 

The only issue that I have with this method is some kind of error that will pop up if you attempt to insert a period (.) in the label of the diagram. For example, using "U.S." instead of "US" will immediately throw an error. Will have to circle back to that. 
<div class="image-wrapper" style="text-align: center;">
    <img src="/assets/images/warner_holoviews_data.png" class="your-image-class" alt="Description" style="margin: 0 auto; display: block;">
    <p class="your-caption-class">Warner Music FY22 dataset.</p>
</div>

<!-- <div id="spreadsheet"></div>
<script>
    var data = [
        ['Digital', 'Recorded Music', '3,305'],
        ['Artist services and expanded-rights', 'Recorded Music', '767'],
        ['Physical', 'Recorded Music', '563'],
        ['Licensing', 'Recorded Music', '331'],
        ['Digital Publishing', 'Music Publishing', '563'],
        ['Synchronization', 'Music Publishing', '172'],
        ['Performance', 'Music Publishing', '159'],
        ['Mechanical', 'Music Publishing', '50'],
        ['Other', 'Music Publishing', '14'],
        ['Recorded Music', 'Revenue', '4966'],
        ['Music Publishing', 'Revenue', '958'],
        ['Revenue', 'Operating income (loss)', '714'],
        ['Revenue', 'Operating expenses', '5,205'],
        ['Revenue', 'Intersegment eliminations', '5'],
        ['Operating income (loss)', 'Pre-tax and interest income (EBIT)', '714'],
        ['Other income (expense), net', 'Pre-tax and interest income (EBIT)', '151'],
        ['Operating expenses', 'Cost of revenue', '3,080'],
        ['Operating expenses', 'Selling, general and administrative expenses (a)', '1,862'],
        ['Operating expenses', 'Amortization expense', '263'],
        ['Pre-tax and interest income (EBIT)', 'Net profit', '551'],
        ['Pre-tax and interest income (EBIT)', 'Income tax expense', '185'],
        ['Pre-tax and interest income (EBIT)', 'Interest expense, net', '125'],
        ['Pre-tax and interest income (EBIT)', 'Income to non-controlling interest', '4'],
    ];

    $('#spreadsheet').jexcel({ 
        data: data, 
        colHeaders: ['Source', 'Target', 'Value'], // Define the headers for the columns
        colWidths: [ 200, 200, 100 ], // Set the widths of the columns
        columns: [ // Define the type of the columns
            { type: 'text' },
            { type: 'text' },
            { type: 'numeric' }
        ],
        style:[ 
            'background-color: #ccffff'
        ],
    });
</script> -->
<pre><code class="language-python">holo_data = pd.read_excel(r"D:\Portfolio\Projects\UMG vs Warner Music vs Sony Music\Holoviews.xlsx")
sankey = hv.Sankey(holo_data, label=r"Warner Music FY 22 (in million US dollars)")
sankey.opts(label_position='left', edge_col
or='target', node_color='index', cmap='tab20', width=750 ,height=600)
</code></pre>

<div class="image-wrapper">
      <iframe src="/assets/sankey_diagram.html" width="100%" height="610" position =absolute></iframe>
      <p class="your-caption-class">Warner Music FY22 Income Statement using Holoviews.</p> 
</div>

<i><b>Plotly</b></i><br>
The same can be achieved with Plotly, much more common visualization library that Holoviews, at the cost things getting a little bit tricky. Unlike Holoview's required input, there is no neat way to fit this into an excel file or DataFrame. The main method of achieving this in Plotly is to pass the node names as indexed numbers and maintain the node list separately.

There is actually a number of <a href = "https://medium.com/@twelsh37/understanding-plotly-sankey-charting-3ee263a81549">different</a> <a href = "https://python.plainenglish.io/sankeying-with-plotly-90500b87d8cf">articles</a> <a href = "https://plotly.com/blog/sankey-diagrams/">online</a> explaining exactly the methods and logic behind building a Sankey so I won't go into much details but I'll explain my input. 

The initial step of the data is to create a dictionary to store the source nodes, target nodes, and the flow, and then convert them to a DataFrame, similar to the main steps in Holoviews. I've written out the source, target, and value lists in the code to showcase that in some cases where the data is not massive that it could be easier to create a Sankey all within Python without the need to load the data from somewhere else. 

<pre><code class="language-python">data = {
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
</code></pre>

Then we create a list called nodes, which will serve as the backbone of our Sankey diagram, representing all the unique starting and ending points in our financial flows. To construct this list, we merge and deduplicate values from both the 'source' and 'target' columns in our DataFrame. The use of sets ensures each entity is unique, and the union operation combines these distinct elements from both columns into one comprehensive list.

<pre><code class="language-python"># Create a list of unique nodes
nodes = list(set(df['source']).union(set(df['target'])))
</code></pre>

Next, we focus on mapping the relationships in our data. For Plotly to understand how to connect the nodes in the Sankey diagram, we need to convert the textual references in our 'source' and 'target' columns into numerical indices. This is achieved through source_indices and target_indices, two lists that correspond to the index positions of each source and target in our nodes list. This translation from text to indices is a critical step, allowing Plotly to accurately map and visualize the flows between different nodes in the diagram.

<pre><code class="language-python"># Create mappings to indices for source and target
source_indices = [nodes.index(src) for src in df['source']]
target_indices = [nodes.index(tgt) for tgt in df['target']]
</code></pre>

With the nodes and relationships defined, we then structure the data in a format that Plotly can interpret. We create a dictionary named plotly_data, which is divided into 'node' and 'link' sections. The 'node' part contains our list of unique nodes, while the 'link' part describes the connections between these nodes, inclusive of the source indices, target indices, and the values representing the magnitude of each flow. This structured format is pivotal for Plotly to accurately construct the Sankey diagram, ensuring each flow is correctly represented both in terms of its origin, destination, and scale.


<pre><code class="language-python"># Prepare the data for Plotly
plotly_data = {
    'node': {'label': nodes},
    'link': {
        'source': source_indices,
        'target': target_indices,
        'value': df['value'].tolist()
    }
}
</code></pre>

The final act in our visualization was to pass plotly_data into Plotly's Sankey function, which then intricately plots each node and draws the links between them as per our provided indices and values. Additionally, the diagram’s aesthetic is refined using the update_layout method, where we add customizations such as title, font, and alignment. Upon calling fig.show(), our meticulously prepared data springs to life in the form of an interactive Sankey diagram!

<pre><code class="language-python">fig = go.Figure(data=[go.Sankey(
    node = plotly_data['node'],
    link = plotly_data['link']
)])
fig.update_layout(title_text="<b>Warner Music FY22 Income Statement (in million U.S. dollars)</b>", title_x=0.5, title_font_family="Calibri", title_font_size=24)
fig.show()
</code></pre>

<div class="image-wrapper">
      <iframe src="/assets/plotly_sankey.html" width="100%" height="700" position =absolute></iframe>
      <p class="your-caption-class">Warner Music FY22 Income Statement using Plotly.</p> 
</div>

Overall, coding a Sankey diagram in Python can be more time consuming than creating other types of visualizations. Nonetheless, the complexity of the process doesn’t detract from the enjoyment of the journey! Similarly, you can use R to create Sankey diagrams. The open-source library ggsankey, available on GitHub, leverages the "grammar of graphics" concept, which is widely appreciated for its simplicity.

<h4>Online Sankey builders</h4>

I couldn’t bring this post properly to its end without discussing online Sankey builders. Most of the Sankey diagrams I've seem online seem to have been made using different online platforms rather than a specific tool, which represents a unique phenomenon in the world of data visualizations.

When it comes to online Sankey diagrams online, most seem to originate from specific sources, with <a href ="sankeymatic.com">sankeymatic.com</a> being the most popular. This site offers a user-friendly and straightforward interface for constructing Sankey diagrams and provides near-real-time rendering. However, this convenience comes at the cost of limited aesthetic customization unless an external graphic editor is used.

Another tool I’ve recently discovered online was one with a fascinating story. A Redditor by the name of <a href="https://www.reddit.com/r/SideProject/comments/108omx5/i_created_a_tool_to_visualize_income_statements/">u/IncomeStatementGuy</a> published a side project they’d been working on about a year ago which was a simple tool; for visualizing Sankey diagrams with a simple user interface that allows for an easy manipulation of all fields such as currency suffixes or dates with seamless transformations. The <a href="https://www.sankeyart.com/">side project has now taken off and is used by multiple renowned and globally known corporations</a>, highlighting the demand for income statement Sankey diagrams.