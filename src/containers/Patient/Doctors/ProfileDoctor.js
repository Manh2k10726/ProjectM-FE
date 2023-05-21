import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import localization from "moment/locale/vi";
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    //thong tin quas khu khac thong tin hien tai
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInfoDoctor(this.props.doctorId)
      if (this.props.doctorId !== prevProps.doctorId) {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
          dataProfile: data,
        });
      }
    }
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd-DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd-MM/DD/YYYY");
      return (
        <>
          <div>
            {time} | {date}
          </div>
          <span>
            <FormattedMessage id="patient.free" />
          </span>
        </>
      );
    }
    return <></>;
  };
  render() {
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      doctorId,
    } = this.props;
    let { dataProfile } = this.state;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName}${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName}${dataProfile.lastName}`;
    }
    return (
      <Fragment>
        <div className="profile-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  dataProfile && dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {isShowDescriptionDoctor === true ? (
                  <>
                    {dataProfile &&
                      dataProfile.markdown &&
                      dataProfile.markdown.description && (
                        <span>{dataProfile.markdown.description}</span>
                      )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataTime)}</>
                )}
              </div>
            </div>
          </div>
          {isShowLinkDetail && isShowLinkDetail === true && (
            <span className="see-more-doctor">
              <Link to={`/detail-doctor/${doctorId}`}> See more</Link>
              {/* <a href={`/detail-doctor/${doctorId}`}> see more </a>*/}
            </span>
          )}
          {isShowPrice && isShowPrice === true && (
            <div className="price">
              <FormattedMessage id="patient.price" /> :
              {dataProfile &&
              dataProfile.Doctor_info &&
              language === LANGUAGES.VI ? (
                <NumberFormat
                  className="currency"
                  value={dataProfile.Doctor_info.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              ) : (
                ""
              )}
              {dataProfile &&
              dataProfile.Doctor_info &&
              language === LANGUAGES.EN ? (
                <NumberFormat
                  className="currency"
                  value={dataProfile.Doctor_info.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
