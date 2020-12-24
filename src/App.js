import React, { Component } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Exe1 from "./components/Exersize1";
import Exe2 from "./components/Exersize2";
import MapBowHead from "./components/MapBowHead";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <main>
          <Exe1 />
          <br />
          <Exe2 />
          <br />
          <MapBowHead />
          <br />
          <img
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            src="https://thumbs-prod.si-cdn.com/bHF0uH2-0BrTSPA1NNTXYDhOngo=/1024x596/https://public-media.si-cdn.com/filer/94/71/947197b1-4aba-41da-9f16-9757a9b407ce/2964350117_aefbc5564e_o.jpg"
            alt="notfound"
          />
        </main>
      </Provider>
    );
  }
}

export default App;
