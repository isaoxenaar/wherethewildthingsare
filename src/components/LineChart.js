import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class LineChart extends Component {
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
    console.log("when", when[15]);
    console.log("depth", depth);

    const options = {
      title: {
        text: "Ground Temprature in Permafrost, Janssonhaugen",
      },
      subtitle: {
        text: "try-out graph",
      },
      xAxis: {
        categories: ["1", "2", "4"],
      },
      yAxis: {
        title: {
          text: "Temperature (\xB0C)",
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#808080",
          },
        ],
      },
      tooltip: {
        valueSuffix: "\xB0C",
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        borderWidth: 0,
      },
      series: [
        {
          name: "15m",
          data: [
            7.0,
            6.9,
            9.5,
            14.5,
            18.2,
            21.5,
            25.2,
            26.5,
            23.3,
            18.3,
            13.9,
            9.6,
          ],
        },
      ],
      chart: {
        type: "line",
        styledMode: true,
      },
    };

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
export default LineChart;