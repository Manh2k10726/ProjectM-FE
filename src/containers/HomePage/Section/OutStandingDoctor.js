import React, { Component } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctor: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let arrDoctor = this.state.arrDoctor;
    // arrDoctor=arrDoctor.concat(arrDoctor).concat(arrDoctor) gap 3 lan so luong phan tu
    let { language } = this.props;
    return (
      <Fragment>
        <div className="section-share section-doctor ">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="home-page.out-standing-doctor" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="home-page.more-info" />
              </button>
            </div>
            <div className="section-slider">
              <Slider {...this.props.settings}>
                {arrDoctor &&
                  arrDoctor.length > 0 &&
                  arrDoctor.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi},${item.lastName}${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn},${item.firstName}${item.lastName}`;
                    return (
                      <div
                        className="section-custom"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="border-custom">
                          <div className="outer-bg">
                            <div
                              className="bg-img img-doctor"
                              style={{ backgroundImage: `url(${imageBase64})` }}
                            ></div>
                          </div>
                          <div className=" name position text-center">
                            <div>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
