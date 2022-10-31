import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {ScheduleDoctorByDate} from '../../../services/userService'

class DoctorSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
          allDays : [],
          allAvailableTime:[]
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    setArrDays= (language)=>{
        let arrDate= []
       for (let i=0; i<7; i++){
        let object={};
        if(language === LANGUAGES.VI){
            let labelVi=  moment(new Date()).add(i,'days').format('dddd - DD/MM');
            object.label =this.capitalizeFirstLetter(labelVi)
        }else{
            object.label = moment(new Date()).add(i,'days').locale('en').format('ddd - DD/MM'); 
        }
        object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();

        arrDate.push(object);
       }
       
       this.setState({
        allDays:arrDate,
       })
    }
    async componentDidMount(){
       let {language} = this.props;

       console.log('vie:',moment(new Date()).format('dddd - DD/MM'));
       console.log('en :',moment(new Date()).locale('en').format('ddd - DD/MM'));
       this.setArrDays(language);
       
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(this.props.language !== prevProps.language){
            this.setArrDays(this.props.language);
        }
    }
    handleOnChangeSelect=async(event)=>{
        if(this.props.doctorIdFromDetailDoctor && this.props.doctorIdFromDetailDoctor != -1 ){
            let doctorId= this.props.doctorIdFromDetailDoctor;
            let date=event.target.value;
            let res = await ScheduleDoctorByDate(doctorId,date);
            if(res && res.errCode === 0){
                let data = res.data;
                this.setState({
                    allAvailableTime: res.data ? res.data :[]
                })
            }
            console.log('check data schedule:',res)
        }
    }    
    render() {
        let {allDays,allAvailableTime}=this.state;
        let {language}=this.props;
        return (
            <Fragment>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                       <select onChange={(event)=> this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length >0 && allDays.map((item ,index)=>{
                            return(
                                <option value={item.value} key={index}>{item.label}</option> 
                            )
                        })}
                       </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'/><span> Lịch Khám</span>
                        </div>
                        <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length >0 ? allAvailableTime.map((item ,index)=>{
                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                            return(
                                <button key={index} className='btn'>{timeDisplay}</button>
                            )
                        })
                        :
                        <div><FormattedMessage id="doctor-schedule.success"/></div>
                        }
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
