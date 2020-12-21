import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchExpeditions } from "../actions/exe1Action";
//add the date ordered.

const white = "#FFFFFF";
const grey = "#110A3F";

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
    showList: true,
  };

  componentDidMount() {
    this.props.dispatch(fetchExpeditions);
  }

  render() {
    const listButtonText = this.state.showList
      ? "Hide Expeditions"
      : "Show Expeditions";

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
        <p id={i}>
          {i + 1} expedition:{e.expedition} date:{e.utc_date} programs:
          {e.programs} conveyance:{e.conveyance}
        </p>
      );
    });
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

function mapStateToProps(reduxState) {
  return {
    expeditions: reduxState.expeditions,
  };
}

export default connect(mapStateToProps)(Exe1);
