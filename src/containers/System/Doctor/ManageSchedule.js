import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import {FormattedMessage} from 'react-intl'
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
// import FormattedDate from '../../../components/Formating/FormattedDate';
class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state={
            listDoctors:[],
            selectedDoctors:{},
            currentDate:'',
            rangeTime:[]
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllCodeScheduleTime()
     }
    componentDidUpdate(prevProps,prevState,snapshot){
        if (prevProps.allDoctor !== this.props.allDoctor) {
         let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
         this.setState({
             listDoctors: dataSelect
         })
        } 
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
           } 
        if(prevProps.language !== this.props.language){
         let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
         this.setState({
             listDoctors: dataSelect
         })
        }
     }
     buildDataInputSelect = (inputData) =>{
        let result = [];
        let {language}=this.props;
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
                let object={};
                let labelVi=`${item.lastName} ${item.firstName}`;
                let labelEn=`${item.firstName} ${item.lastName}`;
                object.label=language ===LANGUAGES.VI ?labelVi:labelEn; 
                object.value=item.id;
                result.push(object)
            })
          
        }
        return result;
    }
    handleChangeSelect =async (selectedDoctors) => {
        this.setState({ selectedDoctors });
    }
    handleOnChangeDatePicker=(date)=>{
        this.setState({
            currentDate : date[0]
        })
        console.log('check value onchange datePicker :',date)
    }
    render() {
        console.log('check state time :',this.state)
        let {rangeTime} = this.state;
        let {language}=this.props;
        return (
            <Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage   id="manage-schedule.title"/>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage   id="manage-schedule.choose-doctor"/></label>
                                <Select
                                    value={this.state.selectedDoctors}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage   id="manage-schedule.Medical-examination-schedule"/></label>
                                <DatePicker onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                    className='form-control'
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                <div className='col-12'>
                                    <FormattedMessage   id="manage-schedule.choose-time"/>:
                                    </div>
                                {rangeTime.map((item,index)=>{
                                    return(
                                        <button className='btn btn-schedule ' key={index}>{language === LANGUAGES.VI ? item.valueVi :item.valueEn}</button>
                                    )
                                })
                                }
                            </div>
                            <div className='col-12 btn-save'>
                                <button className='btn btn-primary btn-save'><FormattedMessage   id="manage-schedule.save"/></button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctor:state.admin.allDoctor,
        language: state.app.language,
        allScheduleTime:state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: ()=> dispatch(actions.fetchAllDoctors()),
        fetchAllCodeScheduleTime: ()=> dispatch(actions.fetchAllCodeScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
