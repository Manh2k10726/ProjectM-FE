import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import '../../styles/styles.scss';
import { handleLoginApi } from "../../services/userService";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";
import "./register.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../utils";
// import * as actions from '../../store/actions'
class Register extends Component {
  //constructor dung khai bao cac sate
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      isShowpass: "",
      errMessage: "",

      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      // actions:'' ,
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      let arrGenders = this.props.genderRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        actions: CRUD_ACTIONS.CREATE,
      });
    }
  }
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "gender",
      "position",
      "role",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let newState = { ...this.state };

    newState[id] = event.target.value;
    this.setState(
      {
        ...newState,
      },
      () => {
        // console.log('check new state',this.state)
      }
    );
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      avatar: this.state.avatar,
      roleId: this.state.role,
      positionId: this.state.position,
    });
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
  handleGoToLogin = () => {
    this.props.history.push(`/login`);
  };
  render() {
    //JSX
    let genders = this.state.genderArr;
    let language = this.props.language;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isLoadingGender = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    return (
      <div className="register-background">
        <div className="register-container">
          <div className="register-content row">
            <div className="col-12 register-text">Register</div>
            <div className="col-12 form-group register-input">
              <label>email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => {
                  this.onChangeInput(event, "email");
                }}
              ></input>
            </div>
            <div className="col-12 form-group register-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowpass ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
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
            <div className="col-12">
              <label>
                <FormattedMessage id="manage-user.first-name" /> :
              </label>
              <input
                className="form-control"
                type="text"
                value={firstName}
                onChange={(event) => {
                  this.onChangeInput(event, "firstName");
                }}
              />
            </div>
            <div className="col-12">
              <label>
                <FormattedMessage id="manage-user.last-name" /> :
              </label>
              <input
                className="form-control"
                type="text"
                value={lastName}
                onChange={(event) => {
                  this.onChangeInput(event, "lastName");
                }}
              />
            </div>
            <div className="col-12">
              <label>
                <FormattedMessage id="manage-user.phone-number" /> :
              </label>
              <input
                className="form-control"
                type="text"
                value={phoneNumber}
                onChange={(event) => {
                  this.onChangeInput(event, "phoneNumber");
                }}
              />
            </div>
            <div className="col-12">
              <label>
                <FormattedMessage id="manage-user.address" /> :
              </label>
              <input
                className="form-control"
                type="text"
                value={address}
                onChange={(event) => {
                  this.onChangeInput(event, "address");
                }}
              />
            </div>
            <div className="col-4">
              <label>
                <FormattedMessage id="manage-user.gender" /> :
              </label>
              <select
                className="form-control"
                value={gender}
                onChange={(event) => {
                  this.onChangeInput(event, "gender");
                }}
              >
                {genders &&
                  genders.length > 0 &&
                  genders.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4">
              <label>
                <FormattedMessage id="manage-user.position" /> :
              </label>
              <select
                className="form-control"
                value={position}
                onChange={(event) => {
                  this.onChangeInput(event, "position");
                }}
              >
                {positions &&
                  positions.length > 0 &&
                  positions.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4">
              <label>
                <FormattedMessage id="manage-user.role-id" /> :
              </label>
              <select
                className="form-control"
                value={role}
                onChange={(event) => {
                  this.onChangeInput(event, "role");
                }}
              >
                {roles &&
                  roles.length > 0 &&
                  roles.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 " style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button
                className="register-btn"
                onClick={() => this.handleSaveUser()}
              >
                Register
              </button>
            </div>
            <div className="col-12 ">
              <button
                className="login-btn"
                onClick={() => this.handleGoToLogin()}
              >
                Login{" "}
              </button>
            </div>
            <div className="col-12">
              <span className="register-forgot">forgot your password?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text">Or login with:</span>
            </div>
            <div className="col-12 register-login">
              <i className="fab fa-google gg">
                {" "}
                <span className="text-icon">
                  {" "}
                  đăng nhập với tài khoản google
                </span>{" "}
              </i>
              <i className="fab fa-facebook-square fb1">
                {" "}
                <span className="text-icon">
                  {" "}
                  đăng nhập với tài khoản facebook
                </span>
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
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.role,
    positionRedux: state.admin.position,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
