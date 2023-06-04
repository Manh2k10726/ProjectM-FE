import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
class Clinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };
  handleToClinic = () => {
    this.props.history.push(`/clinic`);
  };
  render() {
    let { dataSpecialty } = this.state;
    return (
      <Fragment>
        <div className="section-share ">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="home-page.clinic" />
              </span>
              <button
                onClick={() => this.handleToClinic()}
                className="btn-section"
              >
                <FormattedMessage id="home-page.more-info" />
              </button>
            </div>
            <div className="section-slider">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div
                        className="section-custom"
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div className="border-custom">
                          <div
                            className="bg-img img-specialty"
                            style={{ backgroundImage: `url(${item.image})` }}
                          ></div>
                          <div className="name">{item.name}</div>
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux:(language) => dispatch(changeLanguageApp(language))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
