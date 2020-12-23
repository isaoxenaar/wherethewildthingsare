import React, { Component } from "react";
import styled from "styled-components";

import * as d3 from "d3";
import "./InActiveFiles/BarChart.css";

const white = "#FFFFFF";
const grey = "#B0A175";

const BooleanButton = styled.div`
all: unset;
width: 25%;
margin-bottom: 3rem;
margin: auto;
padding: 1rem;
display: flex;
justify-content: center;
align-items: center;
background-color: ${grey};
text-align: center;
font-size: 24px;
font-family: "Times New Roman";
color: ${white};
border-radius: 4px;
cursor: pointer;
&:hover {
  color: ${grey};
  background-color: ${white};
`;

class DataChart extends Component {
  state = {
    showList: true,
  };

  componentDidMount() {}

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
    const listButtonText = this.state.showList ? "Hide" : "Expeditions";
    this.drawChart();

    return (
      <div>
        <BooleanButton
          onClick={() => {
            this.setState({ showList: !this.state.showList });
          }}
        >
          {listButtonText}
        </BooleanButton>
        {this.state.showList && (
          <div id={"#" + this.props.id}>
            <div id="tooltip" class="hidden">
              <p>
                <strong>number of breeding ivory gulls</strong>
              </p>
              <p></p>
            </div>
            {/* <img
         src="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/55025061/1800"
         alt="notfound"
       />
       <div id="title">
         The number of breeding pairs of Ivory gulls on Svalbard from 2009 to
         2019.
       </div>
       <p>
         Development of the ivory gull population in 32 selected colonies,
         stated as a percentage of the average for the entire monitoring
         period. Monitoring of ivory gulls in Svalbard shows a decline in the
         breeding population of approximately 3% per year. The decline is seen
         in the context of the decline in the species' primary habitat – sea
         ice.
       </p> */}
          </div>
        )}
      </div>
    );
  }
}

export default DataChart;
