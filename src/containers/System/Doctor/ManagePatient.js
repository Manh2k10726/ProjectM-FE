import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';
import {getAllPatientForDoctor,postSendRemedy} from '../../../services/userService'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './remedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props){
        super(props);
        this.state = {
           currentDate:moment(new Date()).startOf('day').valueOf(),
           dataPatient:[],
           isTheOpen : false,
           dataModal:{},
           isShowLoading:false,
        }
    }
    async componentDidMount(){
      await this.getDataPatient()
    }
    getDataPatient = async()=>{
        let{user}=this.props;
        let{currentDate}=this.state;
        let formateDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId:user.id,
            date:formateDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient:res.data
            })
        }

    }
    componentDidUpdate(prevProps,prevState,snapshot){
        
    }
    handleOnChangeDatePicker=(date)=>{
        this.setState({
            currentDate : date[0]
        },async()=> {
           await this.getDataPatient()
        }
        )
    }
    handleConfirm= (item) =>{
        let data ={
            doctorId:item.doctorId,
            patientId:item.patientId,
            email: item.patientData.email,
            timeType:item.timeType,
            patientName:item.patientData.firstName,
            timeTypeDataPt:item.timeTypeDataPt,
        }
        console.log('check item data :',item)
        this.setState({
            isTheOpen:true,
            dataModal:data
        })
    }
    handleCloseModal = ()=>{
        this.setState({
            isTheOpen:false
        })
    }
    sendRemedy= async (dataFromChild)=>{
        let {dataModal} = this.state;
        this.setState({
            isShowLoading:true
        })
        let res = await postSendRemedy({
            ...dataFromChild,
            doctorId:dataModal.doctorId,
            patientId:dataModal.patientId,
            timeType:dataModal.timeType,
            language:this.props.language,
            patientName:dataModal.patientName,
            timeTypeDataPt:dataModal.timeTypeDataPt,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading:false
            })
            toast.success('Send Remedy succeeds !!!');
            this.handleCloseModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isShowLoading:false
            })
            toast.error('Something wrongs...')
        }
        console.log('parent check res : ',res)
    }
    render() {
        let{dataPatient,isTheOpen,dataModal,isShowLoading} = this.state;
        console.log('check state:',this.state)
        let {language} = this.props;
        return (
           <>
            <div className='manage-pt-container'>
                <div className='m-pt-title'>
                    Quản lý bệnh nhân
                </div>
                <div className='manage-pt-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}
                            className='form-control'
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                    <table style={{width:'100%'}}>
                        <tbody>
                        <tr>
                            <td>STT</td>
                            <td>Time</td>
                            <td>Name</td>
                            <td>address</td>
                            <td>Gender</td>
                            <td>Status</td>
                        </tr>
                        {dataPatient && dataPatient.length > 0 ?
                            dataPatient.map((item,index)=>{
                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                let time = language === LANGUAGES.VI ? item.timeTypeDataPt.valueVi : item.timeTypeDataPt.valueVi;

                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{time}</td>
                                        <td>{item.patientData.firstName}</td>
                                        <td>{item.patientData.address}</td>
                                        <td>{gender}</td>
                                        <td>
                                            <button className='mp-btn-confirm'
                                                onClick={()=>this.handleConfirm(item)}
                                            >
                                                Xác nhận
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr><td colSpan={6} style={{textAlign:"center"}}>No data !!!</td></tr>
                        }
                        
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <RemedyModal
                isOpen={isTheOpen}
                dataModal={dataModal}
                handleCloseModal={this.handleCloseModal}
                sendRemedy={this.sendRemedy}
            />
            <LoadingOverlay
                active={isShowLoading}
                spinner
                text='Loading ...'
                >
            </LoadingOverlay>
           </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user:state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
