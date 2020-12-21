import React, { Component } from "react";
import { connect } from "react-redux";
import LineChart from "./LineChart";
import LineChart2 from "./LineChart2";
import Barchart from "./BarChart";

class Exe2 extends Component {
  constructor() {
    super();
    this.state = { data: [], loading: true };
  }

  componentDidMount() {
    const fetchData = async (nr) => {
      const response = await fetch(
        `https://api.npolar.no/indicator/timeseries/?facets=label.en&q=&filter-systems=mosj.no&filter-authors.@id=met.no&filter-keywords.@value=land&filter-locations.placename=Janssonhaugen&filter-label.en=${nr}+m&format=json&variant=array&limit=1b`
      );
      const json = await response.json();
      const number = nr.toString();
      this.state.data[number] = json[0].data;
    };
    fetchData(15);
    fetchData(25);
    fetchData(40);
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <p>loading</p>;
    } else {
      return (
        <div>
          <LineChart2 data={this.state} />
          <Barchart />
        </div>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    expeditions: reduxState.expeditions,
  };
}

export default connect(mapStateToProps)(Exe2);
