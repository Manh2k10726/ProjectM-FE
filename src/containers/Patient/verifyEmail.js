import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './verifyEmail.scss'
import {FormattedMessage} from 'react-intl'
import {postVerifyBookAppointment} from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import _ from 'lodash';


// import FormattedDate from '../../../components/Formating/FormattedDate';
class verifyEmail extends Component {
    constructor(props){
        super(props);
        this.state={
            statusVerify:false,
            errCode:0
        }
    }
    async componentDidMount(){
        if(this.props.location && this.props.location.search ){
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId:doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify:true,
                    errCode:res.errCode
                })
            }else{
                this.setState({
                    statusVerify:true,
                    errCode:res&&res.errCode ? res.errCode :"-1"
                })
            }
        }
     }
    componentDidUpdate(prevProps,prevState,snapshot){
       
     }
  
 
    render() {
       let {statusVerify,errCode}= this.state;
        return (
            <Fragment>
                <div>
                    <HomeHeader/>
                    <div className='verify-email-container'>
                        {statusVerify === false ?
                            <div>
                                Loading data...
                            </div>:
                            <div>
                                {errCode === 0?
                                    <div>
                                        <div className='info-verify'>
                                            Xác nhận lịch hẹn thành công !!!
                                        </div>
                                        <div className='booking-image'></div>
                                     </div>:
                                    <div >
                                        <div className='info-verify'>Đã có lỗi xảy ra ,vui lòng thử lại sau !!!</div>
                                        <div className='error'>
                                            <div className='error-image'> </div>
                                            
                                        </div>
                                        <div className='error-detail'>
                                                <h5>Thông tin chi tiết vui lòng liên hệ:</h5>
                                                <h7>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</h7>
                                                <h5>hoặc đến địa chỉ:</h5>
                                                <h7><i className="fas fa-map-marker-alt"></i> 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</h7>
                                                <h7> (để để được hướng dẫn tận tình)</h7>
                                                <h5>trụ sở: </h5>
                                                <h7>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</h7>
                                                <h5>Văn phòng tại TP Hồ Chí Minh:</h5>
                                                <h7>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</h7>
                                                <h4> Xin chân thành cảm ơn !</h4>
                                            </div>
                                    </div>
                                }
                            </div>
                    
                        }
                    </div>
                    <HomeFooter/>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
