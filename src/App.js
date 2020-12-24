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
        </main>
      </Provider>
    );
  }
}

export default App;
