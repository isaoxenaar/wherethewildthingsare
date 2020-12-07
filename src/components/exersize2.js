import React, { Component } from "react";
import { connect } from "react-redux";
import Highstock from "./datachart";

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
    this.setState({ data: json[0].data });
    console.log(nr, json);
  }

  componentDidMount() {
    this.fetchData(15);
    this.fetchData(25);
    this.fetchData(40);
  }

  render() {
    console.log("data", this.state.data);
    return (
      <div>
        <Highstock data15={this.state.data} />
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
