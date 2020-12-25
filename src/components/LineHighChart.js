import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/modules/boost")(Highcharts);

class LineChart2 extends Component {
  render() {
    //prepare data
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

    //prepare chart
    const options = {
      chart: {
        zoomType: "x",
        panning: true,
        panKey: "shift",
        borderColor: "#f5f5dc",
        plotBorderWidth: "5px",
        plotBorderColor: "#B0A175",
        backgroundColor: "#f5f5dc",
        plotShadow: true,
      },
      boost: {
        useGPUTranslations: true,
        enabled: true,
        seriesThreshold: 1,
      },
      title: {
        text: "Permafrost temperature",
      },
      subtitle: {
        text: "At the 15m, 25m, 40m depths",
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
          name: "15m",
          boostTreshold: 1,
          data: depth[15],
          lineWidth: 1,
        },
        {
          name: "25m",
          data: depth[25],
          lineWidth: 5,
        },
        {
          name: "40m",
          boostTreshold: 1,
          data: depth[40],
          lineWidth: 1,
        },
      ],
    };

    //the big return statement
    if (!this.props) {
      return <h1>loading</h1>;
    } else {
      return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <div
            style={{
              color: "grey",
              fontFamily: "Arial",
              display: "block",
              marginLeft: "400px",
              marginRight: "400px",
            }}
          >
            {" "}
            <h3>What is being monitored?</h3>
            <p>
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
            <h5>
              Data from:
              <a style={{ color: "gray" }} href="https://www.met.no/">
                Norwegian Meteorological Institute
              </a>
            </h5>
          </div>
        </div>
      );
    }
  }
}
export default LineChart2;
