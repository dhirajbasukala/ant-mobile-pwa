import React, { Component } from "react";
import { connect } from "react-redux";
import {  Link, Switch, Route , withRouter } from "react-router-dom";
import { Layout, Menu } from 'antd';
// app styles
import './style.scss';

import Home from "../Home";
import Page from "../Page";

const { Header, Content} = Layout; 

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  render() {
    return (
      <Layout
        style={{ minHeight:'100vh'}}
      >
        <Header className="header">
          <Link to="/" className="logo"><h1>Project A</h1></Link>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ marginTop: '20px', marginLeft: '50px', lineHeight: '30px', float: 'left' }}
          >
            <Menu.Item key="1"><Link to="/">Home</Link> </Menu.Item>
            <Menu.Item key="2"><Link to="/sample-page">Sample Page</Link> </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/sample-page" component={Page} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
});


const App = withRouter(connect(mapStateToProps)(AppComponent));
export default App;
