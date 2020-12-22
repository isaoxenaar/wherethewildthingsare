import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/modules/boost")(Highcharts);

class LineChart2 extends Component {
  render() {
    const data = this.props.data.data;
    const when = data.map((v) => {
      return v.map((v) => {
        return v.when;
      });
    });
    const depth = data.map((v) => {
      return v.map((v) => {
        return v.value;
      });
    });
    const dates = when[15];

    console.log("when", dates);
    console.log("depth", depth);
    console.time("line");

    const options = {
      chart: {
        zoomType: "x",
        panning: true,
        panKey: "shift",
        borderColor: "#f5f5dc",
        plotBorderWidth: "5px",
        plotBorderColor: "#f5f5dc",
        backgroundColor: "#B0A175",
        plotShadow: true,
      },
      boost: {
        useGPUTranslations: true,
        enabled: true,
        seriesThreshold: 1,
      },
      title: {
        text: "Highcharts drawing points",
      },
      subtitle: {
        text: "Using the Boost module",
      },
      plotOptions: {
        series: {
          lineWidth: "1000px",
        },
      },
      xAxis: {
        categories: dates,
        text: "white",
      },
      yAxis: {
        title: {
          text: "Temperature (\xB0C)",
          color: "white",
        },
        plotLines: [
          {
            value: 0,
            color: "#c2c2ae",
          },
        ],
      },
      colors: ["#ff6347", "#FF6600", "#FFC300"],
      series: [
        {
          boostTreshold: 1,
          data: depth[15],
          lineWidth: 1,
        },
        {
          data: depth[25],
          lineWidth: 5,
        },
        {
          boostTreshold: 1,
          data: depth[40],
          lineWidth: 1,
        },
      ],
    };
    console.timeEnd("line");

    if (!this.props) {
      return <h1>loading</h1>;
    } else {
      return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <p style={{ color: "grey" }}>
            At suitable places, temperature measurements in boreholes in
            permafrost give firm indications of changes in climate. Data from
            Janssonhaugen show a distinct rise in temperature right down to 40
            metres. Temperature variations at the ground surface through the
            year will be both delayed and moderated downwards. At a depth of
            15–20 metres, temperature variations through the year are balanced
            out. Changes in the average temperature at the ground surface over
            several years and decades will be transmitted to greater depths as
            temperature waves. These measurements are therefore a valuable
            supplement to more traditional climate data from meteorological
            stations in Svalbard.
          </p>
        </div>
      );
    }
  }
}
export default LineChart2;
