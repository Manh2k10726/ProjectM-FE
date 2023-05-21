import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import '../../styles/styles.scss';
import { handleLoginApi } from "../../services/userService";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";
import "./Login.scss";
import { history } from "../../redux";
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
  //constructor dung khai bao cac sate
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowpass: "",
      errMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handelShowHidePassWord = () => {
    this.setState({
      isShowpass: !this.state.isShowpass,
    });
  };
  handleKeyDown = (event) => {
    if (event.key == "Enter") {
      this.handleLogin();
    }
  };
  handleGoToRegister = () => {
    this.props.history.push(`/register`);
  };
  render() {
    //JSX
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              ></input>
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowpass ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                ></input>
                <span
                  onClick={() => {
                    this.handelShowHidePassWord();
                  }}
                >
                  <i
                    className={
                      this.state.isShowpass
                        ? "fas fa-eye eye"
                        : "fas fa-eye-slash eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 " style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button
                className="login-btn"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
              <button
                className="register-btn"
                onClick={() => {
                  this.handleGoToRegister();
                }}
              >
                Register
              </button>
            </div>
            <div className="col-12">
              <span className="login-forgot">forgot your password?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text">Or login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google gg">
                {" "}
                <span className="text-icon">
                  {" "}
                  đăng nhập với tài khoản google
                </span>{" "}
              </i>
              <i className="fab fa-facebook-square fb1">
                {" "}
                <span className="text-icon"> đăng nhập với facebook</span>
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
