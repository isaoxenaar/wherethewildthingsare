import React, { Component } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Exe1 from "./components/Exersize1";
import Exe2 from "./components/Exersize2";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <main>
          <Exe1 />
          <Exe2 />
        </main>
      </Provider>
    );
  }
}

export default App;
