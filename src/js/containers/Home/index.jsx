import React, { Component } from "react";
import autoBind from "auto-bind";
import   Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style';
import { getViewport } from "../../utils";

class Home extends Component {
  constructor(props) {
    super(props);
    const options = [];
    this.state = {
      options,
      viewport: { width: 0, height: 0 } // eslint-disable-line
    };
    autoBind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler, false);
    // initial call to get viewport size
    this.resizeHandler();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler, false);
  }
  updateDimension() {
    const viewport = getViewport();
    this.setState({ viewport }); // eslint-disable-line
  }
  resizeHandler() {
    clearTimeout(this.resizeTracker);
    this.resizeTracker = setTimeout(this.updateDimension, 16);
  }
  handleChange(value) {
    console.log(value, this.state.options.length); // eslint-disable-line
  }
  render() {
    return (
      <div>
        <h1>PWA HOME</h1>
        <Button type="primary" size="small"> Ant mobile button</Button>
      </div>
    );
  }
}

export default Home;
