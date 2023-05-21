import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./detailClinic.scss";

import DoctorSchedule from "../Doctors/DoctorSchedule";
import DoctorExtraInfo from "../Doctors/DoctorExtraInfo";
import ProfileDoctor from "../Doctors/ProfileDoctor";
import { getDetailClinic } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
class detailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
      checkHidden: false,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailClinic({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handelClickHidden = () => {
    this.setState({
      checkHidden: true,
    });
  };
  handelClickShow = () => {
    this.setState({
      checkHidden: false,
    });
  };
  render() {
    let { arrDoctorId, dataDetailClinic, checkHidden } = this.state;
    let { language } = this.props;
    return (
      <Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="specialty-detail-container">
          <div className="sp-detail-up">
            <div className="clinic-name">
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                <div>{dataDetailClinic.name}</div>
              )}
            </div>
            <div
              className={
                checkHidden === false
                  ? "description-specialty-hidden"
                  : "description-specialty-show"
              }
            >
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
              )}
            </div>
            {checkHidden === false ? (
              <span onClick={() => this.handelClickHidden()}>See more</span>
            ) : (
              <span onClick={() => this.handelClickShow()}>Hidden</span>
            )}
          </div>
          <div className="sp-detail-down">
            <div className="sp-detail-down-content">
              {arrDoctorId &&
                arrDoctorId.length > 0 &&
                arrDoctorId.map((item, index) => {
                  return (
                    <div className="each-doctor" key={index}>
                      <div className="doctor-left">
                        <div className="ProfileDoctor">
                          <ProfileDoctor
                            doctorId={item}
                            isShowDescriptionDoctor={true}
                            isShowLinkDetail={true}
                            isShowPrice={false}
                          />
                        </div>
                      </div>
                      <div className="doctor-right">
                        <div className="DoctorSchedule">
                          <DoctorSchedule doctorIdFromDetailDoctor={item} />
                        </div>
                        <div className="DoctorExtraInfo">
                          <DoctorExtraInfo doctorIdFromDetailDoctor={item} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(detailClinic);
