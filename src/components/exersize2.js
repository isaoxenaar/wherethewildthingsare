import React, { Component } from "react";
import { connect } from "react-redux";
import Highstock from "./datachart";

class Exe2 extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  async componentDidMount() {
    const response = await fetch(
      `https://api.npolar.no/indicator/timeseries/?facets=label.en&q=&filter-systems=mosj.no&filter-authors.@id=met.no&filter-keywords.@value=land&filter-locations.placename=Janssonhaugen&filter-label.en=${15}+m&format=json&variant=array&limit=1b`
    );
    const json = await response.json();
    this.setState({ data: json[0].data });
  }

  render() {
    console.log("data", this.state.data);
    return (
      <div>
        <Highstock />
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
