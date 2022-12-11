import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './remedyModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

import _ from 'lodash';
import * as actions from '../../../store/actions'

import { LANGUAGES,CommonUtils } from '../../../utils';
import Select from 'react-select';

import { toast } from 'react-toastify';

class RemedyModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            imageBase64:''
        }
    }
    async componentDidMount(){
        let {language} = this.props;
        if(this.props.dataModal){
            this.setState({
                email:this.props.dataModal.email
            })
        }
        
     }
     async componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email:this.props.dataModal.email
            })
        }
    }
    handleOnChangeEmail=(event)=>{
        this.setState({
            email:event.target.value
        })
    }
    handleOnchangeImg =async (event)=>{
        let data =event.target.files;
        let file =data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64:base64
            })
            
        }
        
        console.log('check file',file)
    }
    handelSendRemedy=()=>{
        this.props.sendRemedy(this.state)
    }
    render() {
        let doctorId ='';
        let {isOpen,dataModal,handleCloseModal,sendRemedy}=this.props;
        console.log(this.props)
        return (
            <Fragment>
                <Modal size="md" isOpen={isOpen} backdrop={true}  className={"modal-booking-container"}>
                <div className='send-to-modal-header'>
                            <span className='left'> Gửi hóa đơn khám bệnh</span>
                            <span className='right'
                            onClick={handleCloseModal}
                            ><i className='fas fa-times'/></span>
                </div>
            <ModalBody>
                <div className='row'>
                    <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event)=>this.handleOnChangeEmail(event)}
                            />
                    </div>
                    <div className='col-6 form-group'>
                        <div >
                            <label>Chọn đơn thuốc</label>
                            <input className='form-control-file' onChange={(event)=>this.handleOnchangeImg(event)} type='file' />
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className='px-3' onClick={()=>this.handelSendRemedy()}>Send </Button>{' '}
              <Button color="secondary" className='px-3' onClick={handleCloseModal}>Close</Button>
            </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
