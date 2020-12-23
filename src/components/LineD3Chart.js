import react, { Component } from "react";
import * as d3 from "d3";

class D3Chart extends Component {

    async drawLineChart() {
      // write your code here
      const data15 = await d3.json(
        "https://api.npolar.no/indicator/timeseries/?facets=label.en&q=&filter-systems=mosj.no&filter-authors.@id=met.no&filter-keywords.@value=land&filter-locations.placename=Janssonhaugen&filter-label.en=15+m&format=json&variant=array&limit=1b"
      );
      const data25 = await d3.json(
        "https://api.npolar.no/indicator/timeseries/?facets=label.en&q=&filter-systems=mosj.no&filter-authors.@id=met.no&filter-keywords.@value=land&filter-locations.placename=Janssonhaugen&filter-label.en=25+m&format=json&variant=array&limit=1b"
      );
      const data40 = await d3.json(
        "https://api.npolar.no/indicator/timeseries/?facets=label.en&q=&filter-systems=mosj.no&filter-authors.@id=met.no&filter-keywords.@value=land&filter-locations.placename=Janssonhaugen&filter-label.en=40+m&format=json&variant=array&limit=1b"
      );
      console.table(data25);
      const dataset = data15[0].data;
      const dataset25 = data25[0].data;
      const dataset40 = data40[0].data;
      const yAccessor = (d) => d.value;
      const dateParser = d3.timeParse("%Y-%m-%d");
      const xAccessor = (d) => dateParser(d.when);
    
      let dimensions = {
        width: window.innerWidth * 0.9,
        height: 400,
        margin: {
          top: 15,
          right: 15,
          bottom: 40,
          left: 60,
        },
      };
      dimensions.boundedWidth =
        dimensions.width - dimensions.margin.left - dimensions.margin.right;
      dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
    
      const wrapper = d3
        .select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);
    
      const bounds = wrapper
        .append("g")
        .style(
          "transform",
          `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
        );
    
      // 4. Create scales
    
      // 4. Create scales
    
      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.boundedHeight, 0]);
    
      const freezingTemperaturePlacement = yScale(-5);
      const freezingTemperatures = bounds
        .append("rect")
        .attr("x", 0)
        .attr("width", dimensions.boundedWidth)
        .attr("y", freezingTemperaturePlacement)
        .attr("height", dimensions.boundedHeight - freezingTemperaturePlacement)
        .attr("fill", "#D2B48C");
    
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth]);
    
      // 5. Draw data
    
      const lineGenerator = d3
        .line()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)));
    
      const line = bounds
        .append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", "#87CEFA")
        .attr("stroke-width", 3);
    
      const line2 = bounds
        .append("path")
        .attr("d", lineGenerator(dataset25))
        .attr("fill", "none")
        .attr("stroke", "#1E90FF")
        .attr("stroke-width", 3);
    
      const line3 = bounds
        .append("path")
        .attr("d", lineGenerator(dataset40))
        .attr("fill", "none")
        .attr("stroke", "#6495ED")
        .attr("stroke-width", 3);
    
      const yAxisGenerator = d3.axisLeft().scale(yScale);
      const yAxis = bounds.append("g");
    
      yAxisGenerator(yAxis);
    
      const xAxisGenerator = d3.axisBottom().scale(xScale);
      const xAxis = bounds
        .append("g")
        .attr("transform", "translate(0," + dimensions.boundedHeight + ")");
    
      xAxisGenerator(xAxis);
    }
    
    drawLineChart();
}

export default D3Chart;
