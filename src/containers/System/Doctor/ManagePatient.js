import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';
import {getAllPatientForDoctor} from '../../../services/userService'
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props){
        super(props);
        this.state = {
           currentDate:moment(new Date()).startOf('day').valueOf(),
           dataPatient:[]
        }
    }
    async componentDidMount(){
        let{user}=this.props;
        let{currentDate}=this.state;
        let formateDate = new Date(currentDate).getTime();
       this.getDataPatient(user,formateDate)
    }
    getDataPatient = async(user,formateDate)=>{
        let res = await getAllPatientForDoctor({
            doctorId:user.id,
            date:formateDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient:res.data
            })
        }
        console.log("check ré :",res)
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        
    }
    handleOnChangeDatePicker=(date)=>{
        this.setState({
            currentDate : date[0]
        },()=>{
            let{user}=this.props;
            let{currentDate}=this.state;
            let formateDate = new Date(currentDate).getTime();
            this.getDataPatient(user,formateDate)
        }
        )
    }
    
    render() {
        let{dataPatient} = this.state;
        console.log('check prop:',this.props)
        console.log('check prop:',this.state)
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
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.timeTypeDataPt.valueVi}</td>
                                        <td>{item.patientData.firstName}</td>
                                        <td>{item.patientData.address}</td>
                                        <td>{item.patientData.genderData.valueVi}</td>
                                        <td>
                                            <button className='mp-btn-confirm'>Xác nhận</button>
                                            <button className='mp-btn-sendTo'>Gửi hóa đơn</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>No data !!!</tr>
                        }
                        
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
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
