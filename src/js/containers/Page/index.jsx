import React, { Component } from "react";
import autoBind from 'auto-bind';

class Page extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return (
      <div>
        <h1> Sample Page test </h1>
      </div>
    );
  }
}

export default Page;
