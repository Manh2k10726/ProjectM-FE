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
        }
    }
    async componentDidMount(){
        let{user}=this.props;
        let{currentDate}=this.state;
        let formateDate = '';
        let res = await getAllPatientForDoctor({
            doctorId:user.id,
            date:formateDate
        })
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        
    }
    handleOnChangeDatePicker=(date)=>{
        this.setState({
            currentDate : date[0]
        })
        console.log('check value onchange datePicker :',date)
    }
    
    render() {
        console.log('check prop:',this.props)
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
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                        </tr>
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
