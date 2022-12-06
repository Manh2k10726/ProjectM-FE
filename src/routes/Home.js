import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn,userInfo } = this.props;
        // let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login';
        // let linkToRedirect = isLoggedIn && userInfo.roleId === "R3" ? '/home' :'/system/user-manage';
        let linkToRedirect = isLoggedIn ? '/system/user-manage':'/home' ;
        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
