import React, { Component } from "react";
import { connect } from "react-redux";
import Highstock from "./LineChart";
import Barchart from "./BarChart";

class Exe2 extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  async fetchData(nr) {
    const response = await fetch(
      `https://api.npolar.no/indicator/timeseries/?facets=label.en&q=&filter-systems=mosj.no&filter-authors.@id=met.no&filter-keywords.@value=land&filter-locations.placename=Janssonhaugen&filter-label.en=${nr}+m&format=json&variant=array&limit=1b`
    );
    const json = await response.json();
    const number = nr.toString();
    this.state[number] = json[0].data;
  }

  componentDidMount() {
    this.fetchData(15);
    this.fetchData(25);
    this.fetchData(40);
  }

  render() {
    console.log("15", this.state);

    return (
      <div>
        <Highstock data={this.state} />
        <Barchart />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    expeditions: reduxState.expeditions,
  };
}

export default connect(mapStateToProps)(Exe2);
