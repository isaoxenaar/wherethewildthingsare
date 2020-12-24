import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchExpeditions } from "../actions/exe1Action";

const white = "#FFFFFF";
const grey = "#B0A175";

const BooleanButton = styled.div`
all: unset;
width: 25%;
margin-bottom: 3rem;
margin: auto;
padding: 1rem;
display: flex;
justify-content: center;
align-items: center;
background-color: ${grey};
text-align: center;
font-size: 24px;
font-family: "Times New Roman";
color: ${white};
border-radius: 4px;
cursor: pointer;
&:hover {
  color: ${grey};
  background-color: ${white};
`;

class Exe1 extends Component {
  state = {
    showList: false,
  };

  // I use redux-state just to show off ;)
  componentDidMount() {
    this.props.dispatch(fetchExpeditions);
  }

  render() {
    const listButtonText = this.state.showList ? "Hide" : "Expeditions";

    const data = this.props.expeditions.list;

    //find unique expeditions
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

    //sort by date
    const sorted = unique.sort(function compare(a, b) {
      const dateA = new Date(a.utc_date);
      const dateB = new Date(b.utc_date);
      return dateA - dateB;
    });

    //find the first and last date, create a new object
    const twoDates = sorted.map((exp) => {
      const allExps = data.filter((e) => {
        return e.expedition === exp.expedition;
      });
      const max = new Date(
        Math.max(...allExps.map((e) => new Date(e.utc_date)))
      );
      const min = new Date(
        Math.min(...allExps.map((e) => new Date(e.utc_date)))
      );
      const min1 = min.toString();
      const max1 = max.toString();
      const dateAdded = {
        expedition: exp.expedition,
        conveyance: exp.conveyance,
        programs: exp.programs,
        date_start: min1,
        date_end: max1,
      };
      return dateAdded;
    });

    //make a newline seperated JSON, that I don't use in the display.
    const ndJson = twoDates.map(JSON.stringify).join("\n");
    console.log("newline seperated JSON", ndJson);

    //Create the display
    const display = twoDates.map((e, i) => {
      return (
        <p id={i}>
          {i + 1}. <span style={{ color: "#B0A175" }}>expedition: </span>
          {e.expedition}
          <br />
          <span style={{ color: "#B0A175" }}>conveyance: </span>
          {e.conveyance}
          <br />
          <span style={{ color: "#B0A175" }}>programs: </span>
          {e.programs}
          <br />
          <span style={{ color: "#B0A175" }}>date start: </span>
          {e.date_start}
          <br />
          <span style={{ color: "#B0A175" }}>date end: </span>
          {e.date_end}
          <br />
        </p>
      );
    });

    //the big return statement
    return (
      <div>
        <BooleanButton
          onClick={() => {
            this.setState({ showList: !this.state.showList });
          }}
        >
          {listButtonText}
        </BooleanButton>
        {this.state.showList && (
          <div>
            <h4>{display}</h4>
          </div>
        )}
      </div>
    );
  }
}

//using the reduxState, because I think ahead.
function mapStateToProps(reduxState) {
  return {
    expeditions: reduxState.expeditions,
  };
}

export default connect(mapStateToProps)(Exe1);
