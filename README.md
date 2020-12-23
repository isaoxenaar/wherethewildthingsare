This app is made with React and can be build as a React App and run on localhost after pulling it from github.

On "{nameof page}" the elements functioning in React are visible.
The Exersize 1 and Exersize 2 of the assignment are there. I as well created some extra elements:

- a D3 version of the Permafrost Line Chart
- an interactive Bar Chart of Ivory Gulls made with D3

Some elements, like the D3 graphs are harder to show nicely in React.
This is because React and D3 are not the best couple.
They have a different way of handling the DOM.
There is a way to go around this, but for now the D3 graphs are visible when run on a localhost.
This goes as follows:

1. In the folder InActiveFiles use the command: python -m SimpleHTTPServer 8888 & (in the terminal)
2. go to localhost:8888/{filename}.html in the browser.
   for example: localhost:8888/IvoryGulls.html

There you can see the functioning D3 visualizations.

The goal of this app is to learn Data Visualization by doing new things.

These are the firsts so far.

1. I have learned to use Highcharts for the first time.
2. I have worked with Leaflet/ GeoJson for the first time.
3. I have made a multiline chart with tooltips in D3 for the first time.
4. I have used an API to create a data chart for the first time.
