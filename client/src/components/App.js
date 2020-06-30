import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";

const DashBoard = () => {
  return <h2>DashBoard</h2>;
};
const SurveyNew = () => {
  return <h2>SurveyNew</h2>;
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header></Header>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={DashBoard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
