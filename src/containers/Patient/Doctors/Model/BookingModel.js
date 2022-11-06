import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModel.scss';
import {  Modal} from 'reactstrap';
import moment from 'moment';
import localization from 'moment/locale/vi';


class DoctorSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    async componentDidMount(){
        let {language} = this.props;
        
     }
    
    async componentDidUpdate(prevProps,prevState,snapshot){
        //thong tin quas khu khac thong tin hien tai
        if(this.props.language !== prevProps.language){
           
        }
      
   
      
} 
    render() {
        
        let {isOpenModal,handleCloseModal,dataTime}=this.props;
        return (
            <Fragment>
                <Modal size="lg" isOpen={isOpenModal} backdrop={true} className={"modal-booking-container"}>
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span className='right'
                            onClick={handleCloseModal}
                            ><i className='fas fa-times'/></span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-info'>

                            </div>
                            <div className='price'> 
                                400.000 VND
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Họ tên</label>
                                    <input className='form-control'/>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control'/>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Email liên hệ</label>
                                    <input className='form-control'/>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ</label>
                                    <input className='form-control'/>
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Lý do khám</label>
                                    <input className='form-control'/>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>đăt cho :</label>
                                    <input className='form-control'/>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>giới tính</label>
                                    <input className='form-control'/>
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking'>Xác nhận</button>
                            <button className='btn-booking-cancel' onClick={handleCloseModal}>Cancel</button>
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
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
