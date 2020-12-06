import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

class HighStock extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  async componentDidMount() {
    let res = await axios.get(
      "https://api.npolar.no/indicator/timeseries/?facets=label.en&q=&filter-systems=mosj.no&filter-authors.@id=met.no&filter-keywords.@value=land&filter-locations.placename=Janssonhaugen&filter-label.en=${15}+m&format=json&variant=array&limit=1b"
    );
    let data = res.data;
    data = data.map((el) => [el[0] * 1000, el[1]]);
    this.setState({ data });
  }
  render() {
    const options = {
      title: {
        text: "My Stock Chart",
      },
      series: [
        {
          name: "Stock Count",
          data: this.state.data,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
      chart: {
        type: "line",
      },
    };
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      </div>
    );
  }
}
export default HighStock;
