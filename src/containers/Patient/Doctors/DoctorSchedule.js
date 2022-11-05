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
    async componentDidMount(){
        let {language} = this.props;
        let allDays=this.getArrDays(language);
        if (allDays && allDays.length>0) {
        this.setState({
            allDays : allDays,
        })
        }
     }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    getArrDays= (language)=>{
        let allDays= []
       for (let i=0; i<7; i++){
        let object={};
        if(language === LANGUAGES.VI){
            if(i === 0){
                let labelVi2=  moment(new Date()).format('DD/MM');
                let today =`Hôm nay - ${labelVi2}`;
                object.label = today
            }else{
                let labelVi=  moment(new Date()).add(i,'days').format('dddd - DD/MM');
                object.label =this.capitalizeFirstLetter(labelVi)
            }
        }else{
            if(i === 0){
                let labelVi2=  moment(new Date()).format('DD/MM');
                let today =`Today - ${labelVi2}`;
                object.label = today
            }else{
                object.label = moment(new Date()).add(i,'days').locale('en').format('ddd - DD/MM'); 
            }
            
        }
        object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
        allDays.push(object);
       }
       return allDays;
    }
    
    async componentDidUpdate(prevProps,prevState,snapshot){
        //thong tin quas khu khac thong tin hien tai
        if(this.props.language !== prevProps.language){
           let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays:allDays
            })
        }
        if(this.props.doctorIdFromDetailDoctor !== prevProps.doctorIdFromDetailDoctor ){
            let allDays = this.getArrDays(this.props.language);
            let res = await ScheduleDoctorByDate(this.props.doctorIdFromDetailDoctor,allDays[0].value);
            this.setState({
                allAvailableTime:res.data ? res.data : []
            })
           
        }
   
      
}
    handleOnChangeSelect=async(event)=>{
        if(this.props.doctorIdFromDetailDoctor && this.props.doctorIdFromDetailDoctor != -1 ){
            let doctorId= this.props.doctorIdFromDetailDoctor;
            let date=event.target.value;
            let res = await ScheduleDoctorByDate(doctorId,date);
            if(res && res.errCode === 0){
                this.setState({
                    allAvailableTime: res.data ? res.data :[]
                })
            }
           
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
                            <i className='fas fa-calendar-alt'/><span><FormattedMessage id="doctor-schedule.Examination-Schedule"/> : </span>
                        </div>
                        <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length >0 ? 
                        <>
                           <div className='time-content-btn'>
                                {
                                        allAvailableTime.map((item ,index)=>{
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return(
                                                <button key={index} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}>{timeDisplay}</button>
                                            )
                                        })
                                    }
                           </div>
                            <div className='free'>
                                <span><FormattedMessage id="doctor-schedule.choose"/> <i className="far fa-hand-point-up"></i> <FormattedMessage id="doctor-schedule.free"/> </span>
                            </div>
                        </>
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
