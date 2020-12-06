import React, { Component } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Exe1 from "./components/exersize1";
import Exe2 from "./components/exersize2";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <main>
          this is for stein, the npi
          <Exe1 />
          <Exe2 />
        </main>
      </Provider>
    );
  }
}

export default App;
