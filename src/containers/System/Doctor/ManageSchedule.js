import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";

// import FormattedDate from '../../../components/Formating/FormattedDate';
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctors: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.fetchAllCodeScheduleTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        // data=data.map(item =>{
        //     item.isSelected = false;
        //     return item;
        // })
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedDoctors) => {
    this.setState({ selectedDoctors });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, currentDate, selectedDoctors } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date !!!");
      return;
    }
    if (selectedDoctors && _.isEmpty(selectedDoctors)) {
      toast.error("Invalid selected doctor !!!");
      return;
    }
    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formattedDate = moment(currentDate).unix();
    let formattedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time, index) => {
          let object = {};
          object.doctorId = selectedDoctors.value;
          object.date = formattedDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time !!!");
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctors.value,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Save Infor Schedule Doctor success !!!");
    } else {
      toast.error("Save Bulk Schedule Doctor Error !!!");
    }
  };
  render() {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <Fragment>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctors}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.Medical-examination-schedule" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  value={this.state.currentDate}
                  minDate={yesterday}
                  className="form-control"
                />
              </div>
              <div className="col-12 pick-hour-container">
                <div className="col-12">
                  <FormattedMessage id="manage-schedule.choose-time" />:
                </div>
                <div className="col-12" style={{ marginLeft: "4px" }}>
                  {rangeTime.map((item, index) => {
                    return (
                      <button
                        onClick={() => this.handleClickBtnTime(item)}
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule "
                        }
                        style={{ margin: "8px" }}
                        key={index}
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="col-12 btn-save">
                <button
                  className="btn btn-primary btn-save"
                  onClick={() => this.handleSaveSchedule()}
                >
                  <FormattedMessage id="manage-schedule.save" />
                </button>
              </div>
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
    allDoctor: state.admin.allDoctor,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllCodeScheduleTime: () =>
      dispatch(actions.fetchAllCodeScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
