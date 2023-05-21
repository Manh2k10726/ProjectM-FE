import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";

class Home extends Component {
  render() {
    const { isLoggedIn, userInfo } = this.props;
    console.log("isLoggedIn", isLoggedIn);
    console.log("userInfo", userInfo);
    let linkToRedirect = isLoggedIn ? "/home" : "/login";
    // let linkToRedirect = userInfo.roleId === "R3" ? "/system/user-manage" : "/";
    // let linkToRedirect = isLoggedIn ? '/system/user-manage':'/home' ;
    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
