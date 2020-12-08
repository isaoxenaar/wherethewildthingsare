import React, { Component } from "react";
import * as d3 from "d3";
import "./BarChart.css";

class DataChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var w = 600;
    var h = 250;

    var dataset = [114, 129, 133, 115, 82, 97, 91, 105, 98, 59, 77];

    var xScale = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, h]);

    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("y", function (d) {
        return h - yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return yScale(d);
      })
      .attr("fill", function (d) {
        return "rgb(180, 170, " + Math.round(d + 50) + ")";
      })
      .on("mouseover", function (d) {
        var xPosition =
          parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

        d3.select("#tooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px")
          .select("#value")
          .text(d);

        d3.select("#tooltip").classed("hidden", false);
      })
      .on("mouseout", function () {
        d3.select("#tooltip").classed("hidden", true);
      })
      .on("click", function () {
        sortBars();
      })
      .append("title")
      .text(function (d, i) {
        return i + 2009;
      });

    var sortOrder = false;

    var sortBars = function () {
      sortOrder = !sortOrder;

      svg
        .selectAll("rect")
        .sort(function (a, b) {
          if (sortOrder) {
            return d3.ascending(a, b);
          } else {
            return d3.descending(a, b);
          }
        })
        .transition()
        .delay(function (d, i) {
          return i * 500;
        })
        .duration(1000)
        .attr("x", function (d, i) {
          return xScale(i);
        });
    };
  }

  render() {
    return (
      <div id={"#" + this.props.id}>
        <div id="tooltip" class="hidden">
          <p>
            <strong>number of breeding ivory gulls</strong>
          </p>
          <p>
            <span id="value">100</span>
          </p>
        </div>
      </div>
    );
  }
}

export default DataChart;
