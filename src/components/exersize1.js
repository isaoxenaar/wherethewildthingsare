import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchExpeditions } from "../actions/exe1Action";

class Exe1 extends Component {
  componentDidMount() {
    this.props.dispatch(fetchExpeditions);
  }

  render() {
    const data = this.props.expeditions.list;

    const removeDuplicates = (array) => {
      const double = {};
      const unique = [];
      array.forEach((e) => {
        if (!double[e.expedition]) {
          double[e.expedition] = true;
          unique.push(e);
        }
      });
      return unique;
    };

    const unique = removeDuplicates(data);

    const sorted = unique.sort(function compare(a, b) {
      var dateA = new Date(a.utc_date);
      var dateB = new Date(b.utc_date);
      return dateA - dateB;
    });
    const ndJson = sorted.map(JSON.stringify).join("\n");
    console.log(ndJson);

    const display = sorted.map((e, i) => {
      return (
        <li id={i}>
          {e.expedition} {e.utc_date} {e.programs} {e.conveyance}
        </li>
      );
    });
    return <div>{display}</div>;
  }
}

function mapStateToProps(reduxState) {
  return {
    expeditions: reduxState.expeditions,
  };
}

export default connect(mapStateToProps)(Exe1);
