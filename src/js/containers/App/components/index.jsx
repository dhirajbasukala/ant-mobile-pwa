import React, { Component, Fragment } from "react";
import {  Link, Switch, Route  } from "react-router-dom";
import PropTypes from 'prop-types';
// app styles
import '../style.scss';

import Home from "../../Home";
import Page from "../../Page";

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  componentDidMount(){
    this.props.sayHelloWorld();
  }
  render() {
    return (
      <Fragment>
        <header className="header">
          <div className="logo">
            <Link to="/"><h1>Project Abac</h1></Link>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/sample-page">Sample Page</Link>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sample-page" component={Page} />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

AppComponent.propTypes = {
  sayHelloWorld: PropTypes.func.isRequired
}

export default AppComponent;
