import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import MapBox from "./../../HomePage/Map/map";
import GoogleMap from "./../../HomePage/Map/map";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.lastName}${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName}${detailDoctor.lastName}`;
    }
    const adr = (link) => {
      return (
        <div
          id="map-container-google-1"
          class="z-depth-1-half map-container"
          style={{
            height: "500px",
          }}
        >
          <iframe
            src={link}
            frameborder="0"
            style={{
              border: "0",
              height: "100%",
              width: "100%",
            }}
            allowfullscreen
          ></iframe>
        </div>
      );
    };

    const renderMap = (detailDoctor) => {
      switch (detailDoctor.id) {
        case 1:
          return adr(
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.757025313847!2d105.7995676761801!3d21.002374688682544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5ac9beb0bd%3A0xc4069a08defd1deb!2sChung%20c%C6%B0%20Golden%20West!5e0!3m2!1svi!2s!4v1684310346651!5m2!1svi!2s"
          );
        case 2:
          return adr(
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.757025313847!2d105.7995676761801!3d21.002374688682544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5ac9beb0bd%3A0xc4069a08defd1deb!2sChung%20c%C6%B0%20Golden%20West!5e0!3m2!1svi!2s!4v1684310346651!5m2!1svi!2s"
          );
        default:
          return adr(
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.757025313847!2d105.7995676761801!3d21.002374688682544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5ac9beb0bd%3A0xc4069a08defd1deb!2sChung%20c%C6%B0%20Golden%20West!5e0!3m2!1svi!2s!4v1684310346651!5m2!1svi!2s"
          );
      }
    };
    return (
      <Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.markdown &&
                  detailDoctor.markdown.description && (
                    <span>{detailDoctor.markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                doctorIdFromDetailDoctor={this.state.currentDoctorId}
              />
            </div>
            <div className="content-right">
              <DoctorExtraInfo
                doctorIdFromDetailDoctor={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-infor-doctor" style={{ display: "flex" }}>
            <div>
              {detailDoctor &&
                detailDoctor.markdown &&
                detailDoctor.markdown.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.markdown.contentHTML,
                    }}
                  ></div>
                )}
            </div>
            <div style={{ width: "50%" }}>
              {/* <MapBox /> */}
              {renderMap(detailDoctor)}
            </div>
          </div>

          <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
