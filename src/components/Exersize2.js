import React, { Component } from "react";
import styled from "styled-components";
import LineChart2 from "./LineHighChart";

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

class Exe2 extends Component {
  constructor() {
    super();
    this.state = { data: [], loading: true, showList: false };
  }

  // fetch data with promise function
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
    const listButtonText = this.state.showList ? "Hide" : "Permafrost Chart";
    // the big return statement
    if (this.state.loading) {
      return <p>loading</p>;
    } else {
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
              <LineChart2 data={this.state} />
            </div>
          )}
        </div>
      );
    }
  }
}

export default Exe2;
