import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailSpecialty.scss';

import DoctorSchedule from '../Doctors/DoctorSchedule'
import DoctorExtraInfo from '../Doctors/DoctorExtraInfo';
import ProfileDoctor from '../Doctors/ProfileDoctor';
import {getDetailSpecialty,getAllCodeService,getProfileDoctorById,ScheduleDoctorByDate} from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailSpecialty extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrDoctorId:[],
            dataDetailSpecialty:{},
            listProvince:[],
            checkHidden:false
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            
            let id= this.props.match.params.id;
           
            let res= await getDetailSpecialty({
                id : id ,
                location : 'ALL'
            });
            let resProvince= await getAllCodeService("PROVINCE")
            if(res && res.errCode === 0 && resProvince && resProvince.errCode===0){
                let data = res.data;
                let arrDoctorId=[];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince =resProvince.data;
                if(dataProvince && dataProvince.length>0){
                    dataProvince.unshift({
                        createdAt:null,
                        keyMap:'ALL',
                        type:"PROVINCE",
                        valueEn:"All Province",
                        valueVi:"Toàn quốc"
                    })
                }
                this.setState({
                    dataDetailSpecialty:res.data,
                    arrDoctorId:arrDoctorId,
                    listProvince:dataProvince ? dataProvince:[]
                })
            }
        }
    }
    async  componentDidUpdate(prevProps,prevState,snapshot){
        if (this.props.language !== prevProps.language) {
        }
        
        // if(this.props.doctorIdFromDetailDoctor !== prevProps.doctorIdFromDetailDoctor ){
        //     let allDays = this.getArrDays(this.props.language);
        //     let res = await ScheduleDoctorByDate(this.props.doctorIdFromDetailDoctor,allDays[0].value);
        //     this.setState({
        //         allAvailableTime:res.data ? res.data : []
        //     })
           
        // }
    }
    handelSelect=async (event)=>{
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            
            let id= this.props.match.params.id;
            let location = event.target.value;
            let res= await getDetailSpecialty({
                id : id ,
                location :location
            });
            if(res && res.errCode === 0 ){
                let data = res.data;
                let arrDoctorId=[];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                
                this.setState({
                    dataDetailSpecialty:res.data,
                    arrDoctorId:arrDoctorId,
                    
                })
            }
        }
    }
    handelClickHidden=()=>{
        this.setState({
            checkHidden:true
        })
        
    }
    handelClickShow=()=>{
        this.setState({
            checkHidden:false
        })
    }
    render() {
        let {arrDoctorId,dataDetailSpecialty,listProvince,checkHidden}=this.state;
        let {language}=this.props;
        console.log("check state arrDoctorId: ",this.state.arrDoctorId)
        return (
            <Fragment>
                <HomeHeader isShowBanner={false}/>
                <div className='specialty-detail-container'>
                    <div className='sp-detail-up'>
                    <div className={checkHidden===false?'description-specialty-hidden':'description-specialty-show'} /*style={{ background:'url(./../../../../assets/doctor/103848anh-dai-dien-bs.jpg)' }}*/>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                                &&<div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML}}>
                                        
                                </div>
                            } 
                    </div>
                    {checkHidden===false ?
                        <span onClick={()=>this.handelClickHidden()}>See more</span>:
                        <span onClick={()=>this.handelClickShow()}>Hidden</span>
                    }
                    </div>
                    <div className='sp-detail-down'>
                    <div className='sp-detail-down-content'>
                    <div className='search-sp-doctor'>
                            <select onChange={(event)=> this.handelSelect(event)}>
                                {listProvince && listProvince.length >0 &&
                                    listProvince.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi :item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length> 0 &&
                            arrDoctorId.map((item,index)=>{
                               console.log('check  mang Id ',arrDoctorId) 
                                return(
                                    <div className='each-doctor'  key={index} >
                                        <div className='doctor-left'>
                                            <div className='ProfileDoctor'>
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='doctor-right'>
                                            <div className='DoctorSchedule'>
                                                <DoctorSchedule
                                                    doctorIdFromDetailDoctor={item}
                                                />
                                            </div>
                                            <div className='DoctorExtraInfo'>
                                                <DoctorExtraInfo
                                                doctorIdFromDetailDoctor={item}
                                                />
                                            </div>
                                            
                                        </div>
                                    </div>
                            )
                        })
                    }
                    </div>
                    </div>    
                </div>
            <HomeFooter/>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
