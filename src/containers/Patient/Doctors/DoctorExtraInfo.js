import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { FormattedMessage } from 'react-intl';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import {getExtraInfoDoctorById} from '../../../services/userService';
import NumberFormat from 'react-number-format'

class DoctorExtraInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
          isShowDetailInfo:false,
          extraInfo:[]
        }
    }

    async componentDidMount(){
        if (this.props.doctorIdFromDetailDoctor) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromDetailDoctor);
        if (res && res.errCode === 0) {
         this.setState({
             extraInfo:res.data
         })
        } 
        }
       
    }
    async componentDidUpdate(prevProps,prevState,snapshot){
        if(this.props.language !== prevProps.language){
            
         }
        if(this.props.doctorIdFromDetailDoctor !== prevProps.doctorIdFromDetailDoctor ){
           let res = await getExtraInfoDoctorById(this.props.doctorIdFromDetailDoctor);
           if (res && res.errCode === 0) {
            this.setState({
                extraInfo:res.data
            })
           }

        }
    }
    showHideDetailInfo =(status)=>{
        this.setState({
            isShowDetailInfo:status
        })
    }
    render() {
        let {isShowDetailInfo,extraInfo}= this.state
        let {language}=this.props;
        console.log('check state extra :',this.state)
        return (
            <Fragment>
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            <FormattedMessage id="doctor-schedule.addressClinic"/>: 
                        </div>
                        <div className='name-clinic'>{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic :'' }</div>
                        <div className='detail-address'>{extraInfo && extraInfo.addressClinic ?extraInfo.addressClinic :''}</div>
                    </div>
                    <div className='content-down'>
                        { isShowDetailInfo === false ?
                        <div className='shot-info'><FormattedMessage id="doctor-schedule.price"/>: 
                            {extraInfo && extraInfo.priceTypeData 
                                && language ===LANGUAGES.VI ? 
                                <NumberFormat className='currency' value={extraInfo.priceTypeData .valueVi} 
                                displayType={'text'} thousandSeparator={true} suffix={'VND'} /> :''
                            }
                            {extraInfo && extraInfo.priceTypeData 
                                && language ===LANGUAGES.EN ? 
                                <NumberFormat className='currency' value={extraInfo.priceTypeData .valueEn} 
                                displayType={'text'} thousandSeparator={true} suffix={'$'} /> :''
                            }
                             <span className='detail' onClick={()=>this.showHideDetailInfo(true)}><FormattedMessage id="doctor-schedule.show"/></span></div> :
                        <>
                            <div className='title-price'><FormattedMessage id="doctor-schedule.price"/>: </div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id="doctor-schedule.price"/>:</span>
                                    <span className='right'>
                                        {extraInfo && extraInfo.priceTypeData 
                                            && language ===LANGUAGES.VI ? 
                                            <NumberFormat className='currency' value={extraInfo.priceTypeData .valueVi} 
                                            displayType={'text'} thousandSeparator={true} suffix={'VND'} /> :''
                                        }
                                        {extraInfo && extraInfo.priceTypeData 
                                            && language ===LANGUAGES.EN ? 
                                            <NumberFormat className='currency' value={extraInfo.priceTypeData .valueEn} 
                                            displayType={'text'} thousandSeparator={true} suffix={'$'} /> :''
                                        }  
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfo && extraInfo.note ?extraInfo.note :''}
                                </div>
                            </div>
                            <div className='payment'><FormattedMessage id="doctor-schedule.payment"/>: 
                                        {extraInfo && extraInfo.paymentTypeData 
                                            && language ===LANGUAGES.VI ? 
                                            extraInfo.paymentTypeData.valueVi :''
                                        }
                                        {extraInfo && extraInfo.paymentTypeData 
                                            && language ===LANGUAGES.EN ? 
                                           extraInfo.paymentTypeData.valueEn:''
                                        }
                            </div>
                            <div>
                            <div className='hide-price' onClick={()=>this.showHideDetailInfo(false)}><span><FormattedMessage id="doctor-schedule.hide"/></span></div>
                            </div>
                        </>
                        }
                        
                       
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
