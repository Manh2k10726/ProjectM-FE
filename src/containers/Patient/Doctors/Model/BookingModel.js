import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModel.scss';
import {  Modal} from 'reactstrap';
import moment from 'moment';
import localization from 'moment/locale/vi';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'

import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import {postPatientBookAppointment} from '../../../../services/userService';
import { toast } from 'react-toastify';

class BookingModel extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullName:'',
            phoneNumber:'',
            email:'',
            address:'',
            reason:'',
            birthday:'',
            selectedGender:'',
            genders:'',
            doctorId:'',
            timeType:''
        }
    }
    async componentDidMount(){
        let {language} = this.props;
        this.props.getGender()
        
     }
    
    async componentDidUpdate(prevProps,prevState,snapshot){
        //thong tin quas khu khac thong tin hien tai
        if(this.props.genders !== prevProps.genders){
           this.setState({
            genders: this.BuildDataGender(this.props.genders)
           })
        }
        if(this.props.language !== prevProps.language){
            this.setState({
                    genders: this.BuildDataGender(this.props.genders)
               })
        } 
        if(this.props.dataTime !== prevProps.dataTime){
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
               let doctorId = this.props.dataTime.doctorId;
               let timeType = this.props.dataTime.timeType;
               this.setState({
                doctorId:doctorId,
                timeType:timeType
               })
            }
        }
} 
BuildDataGender = (data)=>{
    
    let result = [];
    let {language} = this.props;
    if (data && data.length > 0) {
        data.map(item =>{
            let object = {};
            object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            object.value =item.keyMap;
            result.push(object)
        })
    }
    return result;
}
handleOnchangeInput=(event,id)=>{
    let valueInput= event.target.value;
    let stateCopy ={...this.state};
    stateCopy[id] = valueInput;
    this.setState({
        ...stateCopy
    })
}
handleOnchangeDatePicker=(date)=>{
    this.setState({
        birthday:date[0]
    })
}
handleOnchangeSelect=(selectedOption)=>{
    this.setState({
        selectedGender:selectedOption
    });
}
buildTimeBooking= (dataTime)=>{
    let {language}=this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
        let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
        let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date/1000).format('dddd-DD/MM/YYYY'):
        moment.unix(+dataTime.date/1000).locale('en').format('ddd-MM/DD/YYYY')
        return(
            `${time}-${date}`
        )
    }
    return<></>
}
buildNameBooking= (dataTime)=>{
    let {language}=this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
        let name = language === LANGUAGES.VI ?`${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
        :
       `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}
        `;
        return name;
    }
    return<></>
}
handleConfirmBooking = async () => {
    //validate input
    let date =  new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime)
    let doctorName = this.buildNameBooking(this.props.dataTime)
    let res = await postPatientBookAppointment({
            fullName:this.state.fullName,
            phoneNumber:this.state.phoneNumber,
            email:this.state.email,
            address:this.state.address,
            reason:this.state.reason,
            date:this.props.dataTime.date,
            birthday:date,
            selectedGender:this.state.selectedGender.value,
            doctorId:this.state.doctorId,
            timeType: this.state.timeType,
            language:this.props.language,
            timeString:timeString,
            doctorName:doctorName
    })
    if(res && res.errCode === 0){
        toast.success('Booking a new appointment succeed !!!Check your email to complete the procedure ! ');
        this.props.handleCloseModal()
    }else{
        toast.error('Booking a new appointment error !!! ')
    }
    console.log('check data input :  ',this.state)
}
    render() {
        let doctorId ='';
        let {isOpenModal,handleCloseModal,dataTime}=this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <Fragment>
                <Modal size="lg" isOpen={isOpenModal} backdrop={true} className={"modal-booking-container"}>
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'> <FormattedMessage id="patient.Information"/></span>
                            <span className='right'
                            onClick={handleCloseModal}
                            ><i className='fas fa-times'/></span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    isShowPrice = {true}
                                    dataTime={dataTime}
                                />
                            </div>
                            
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.name"/> :</label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event)=> this.handleOnchangeInput(event,'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.phone-number"/> :</label>
                                    <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event)=> this.handleOnchangeInput(event,'phoneNumber')}/>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.email"/> :</label>
                                    <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event)=> this.handleOnchangeInput(event,'email')}/>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.address"/> :</label>
                                    <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event)=> this.handleOnchangeInput(event,'address')}/>
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.reason"/> :</label>
                                    <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event)=> this.handleOnchangeInput(event,'reason')}/>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.birthday"/>:</label>
                                   <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                   />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.gender"/> :</label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleOnchangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking' 
                                onClick={()=> this.handleConfirmBooking()}
                                ><FormattedMessage id="patient.Confirm"/></button>
                            <button className='btn-booking-cancel' onClick={handleCloseModal}><FormattedMessage id="patient.Cancel"/></button>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender:()=> dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
