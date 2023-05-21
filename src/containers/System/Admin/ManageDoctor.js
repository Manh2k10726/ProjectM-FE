import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  /**life cycle (vong doi react)
   * run component:
   * 1. chay tu constructor -> init state
   * 2. ham Did mount (set state,goi api,lay gia tri):born,   unmount
   * 3. Render du lieu (re-render)
   */
  constructor(props) {
    super(props);
    this.state = {
      // save to markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      //save to doctor_info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.getRequiredDoctorInfo();
  }

  handelSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.SaveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
  };
  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let { listPayment, listProvince, listPrice, listClinic, listSpecialty } =
      this.state;
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.markdown) {
      let Markdown = res.data.markdown;
      let addressClinic = "",
        note = "",
        nameClinic = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        clinicId = "",
        specialtyId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedClinic = "",
        selectedSpecialty = "";

      if (res.data.Doctor_info) {
        addressClinic = res.data.Doctor_info.addressClinic;
        nameClinic = res.data.Doctor_info.nameClinic;
        note = res.data.Doctor_info.note;
        paymentId = res.data.Doctor_info.paymentId;
        priceId = res.data.Doctor_info.priceId;
        provinceId = res.data.Doctor_info.provinceId;
        specialtyId = res.data.Doctor_info.specialtyId;
        clinicId = res.data.Doctor_info.clinicId;

        selectedPayment = listPayment.find((item) => {
          if (item.value === paymentId) {
            return item && item.value === paymentId;
          }
        });

        selectedPrice = listPrice.find((item) => {
          if (item.value === priceId) {
            return item && item.value === priceId;
          }
        });
        selectedProvince = listProvince.find((item) => {
          if (item.value === provinceId) {
            return item && item.value === provinceId;
          }
        });
        selectedClinic = listClinic.find((item) => {
          if (item.value === clinicId) {
            return item && item.value === clinicId;
          }
        });
        selectedSpecialty = listSpecialty.find((item) => {
          if (item.value === specialtyId) {
            return item && item.value === specialtyId;
          }
        });
      }
      this.setState({
        contentHTML: Markdown.contentHTML,
        contentMarkdown: Markdown.contentMarkdown,
        description: Markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        clinicId: "",
        specialtyId: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handelOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type == "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VNĐ`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USERS");
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listDoctors: dataSelect,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USERS");
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      //  console.log('check data new select' ,dataSelectPrice,dataSelectPayment,dataSelectProvince)
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listDoctors: dataSelect,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }
  handelOnChangeSelectDoctorInfo = async (selectedDoctor, name) => {
    // this.setState({ selectedDoctor });
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
    // console.log('check name select on change',selectedDoctor , name)
  };
  render() {
    let { hasOldData } = this.state;

    return (
      <Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="doctor-schedule.title" />
          </div>
          <div className="more-info">
            <div className="content-left form-group">
              <label>
                <FormattedMessage id="doctor-schedule.select-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                name={"selectedDoctor"}
                placeholder={
                  <FormattedMessage id="doctor-schedule.select-doctor" />
                }
              />
            </div>
            <div className="content-right">
              <label>
                <FormattedMessage id="doctor-schedule.info-doctor" />:{" "}
              </label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(event) =>
                  this.handelOnChangeText(event, "description")
                }
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="more-info-extra row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.price" />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handelOnChangeSelectDoctorInfo}
                options={this.state.listPrice}
                name="selectedPrice"
                placeholder={<FormattedMessage id="doctor-schedule.price" />}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handelOnChangeSelectDoctorInfo}
                options={this.state.listPayment}
                name="selectedPayment"
                placeholder={<FormattedMessage id="doctor-schedule.payment" />}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.province" />
              </label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handelOnChangeSelectDoctorInfo}
                options={this.state.listProvince}
                name="selectedProvince"
                placeholder={<FormattedMessage id="doctor-schedule.province" />}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.ClinicName" />{" "}
              </label>
              <input
                onChange={(event) =>
                  this.handelOnChangeText(event, "nameClinic")
                }
                value={this.state.nameClinic}
                className="form-control"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.addressClinic" />
              </label>
              <input
                onChange={(event) =>
                  this.handelOnChangeText(event, "addressClinic")
                }
                value={this.state.addressClinic}
                className="form-control"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.note" />
              </label>
              <input
                onChange={(event) => this.handelOnChangeText(event, "note")}
                value={this.state.note}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.select-clinic" />
              </label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handelOnChangeSelectDoctorInfo}
                options={this.state.listClinic}
                name="selectedClinic"
                placeholder={
                  <FormattedMessage id="doctor-schedule.select-clinic" />
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.select-specialty" />
              </label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.handelOnChangeSelectDoctorInfo}
                options={this.state.listSpecialty}
                name="selectedSpecialty"
                placeholder={
                  <FormattedMessage id="doctor-schedule.select-specialty" />
                }
              />
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "450px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <button
            className={
              hasOldData === true
                ? "save-content-markdown"
                : "create-content-markdown"
            }
            onClick={() => this.handelSaveContentMarkdown()}
          >
            {hasOldData === true ? (
              <span>
                <FormattedMessage id="doctor-schedule.edit-doctor" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="doctor-schedule.save-doctor" />
              </span>
            )}
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctor: state.admin.allDoctor,
    language: state.app.language,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log("drop", props.contentMarkdown)
  return {
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    SaveDetailDoctor: (data) => dispatch(actions.SaveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
