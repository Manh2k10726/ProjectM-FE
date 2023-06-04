import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleToSpecialty = () => {
    this.props.history.push(`/specialty`);
  };
  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };
  render() {
    let { dataSpecialty } = this.state;
    return (
      <Fragment>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="home-page.specialty" />
              </span>
              <button
                onClick={() => this.handleToSpecialty()}
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
                        onClick={() => this.handleViewDetailSpecialty(item)}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
