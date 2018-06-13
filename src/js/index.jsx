import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

import configureStore from './config/configureStore'
import App from "./containers/App";

import '../styles/style.scss';

// load open sans from google fonts and local font-awesome 
import './config/fontLoader';

// mount it on the Store
const store = configureStore();

const Renderer = Root =>
  render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Root />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );

// initial render
Renderer(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./containers/App", () => {
    const HotApp = require("./containers/App").default;
    Renderer(HotApp);
  });
}
