import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
// import FontFaceObserver from 'fontfaceobserver';

import configureStore from './config/configureStore'
import App from "./containers/App";

// load generic styles and fonts 
import '../styles/style.scss';
import '../styles/fontawesome/fontawesome.scss';

// load open sans from google fonts and local font-awesome 
import './containers/Common/FontLoader';

// mount it on the Store
const store = configureStore(); // createStore(rootReducer, enhancer, preloadedState);

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

  // will need reducer hot module reloading as well here for later 
}
