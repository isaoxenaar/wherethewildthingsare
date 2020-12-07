import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

class HighStock extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  //   async componentDidMount() {
  //     let res = await axios.get("");
  //     let data = res.data;
  //     data = data.map((el) => [el[0] * 1000, el[1]]);
  //     this.setState({ data });
  //   }

  render() {
    console.log("data in chart", this.props.data15);
    const options = {
      title: {
        text: "Ground Temprature in Permafrost, Janssonhaugen",
      },
      subtitle: {
        text: "try-out graph",
      },
      xAxis: {
        categories: [
          "2000",
          "2002",
          "2004",
          "2006",
          "2008",
          "2010",
          "2012",
          "2014",
          "2016",
          "2018",
        ],
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
        {
          name: "25m",
          data: [
            -0.9,
            0.6,
            3.5,
            8.4,
            13.5,
            17.0,
            18.6,
            17.9,
            14.3,
            9.0,
            3.9,
            1.0,
          ],
        },
        {
          name: "40m",
          data: [
            3.9,
            4.2,
            5.7,
            8.5,
            11.9,
            15.2,
            17.0,
            16.6,
            14.2,
            10.3,
            6.6,
            4.8,
          ],
        },
      ],
      chart: {
        type: "line",
      },
    };
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <p style={{ color: "grey" }}>
          At suitable places, temperature measurements in boreholes in
          permafrost give firm indications of changes in climate. Data from
          Janssonhaugen show a distinct rise in temperature right down to 40
          metres. Temperature variations at the ground surface through the year
          will be both delayed and moderated downwards. At a depth of 15–20
          metres, temperature variations through the year are balanced out.
          Changes in the average temperature at the ground surface over several
          years and decades will be transmitted to greater depths as temperature
          waves. These measurements are therefore a valuable supplement to more
          traditional climate data from meteorological stations in Svalbard.
        </p>
      </div>
    );
  }
}
export default HighStock;
