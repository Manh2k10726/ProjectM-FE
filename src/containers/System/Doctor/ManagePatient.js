import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';


class ManagePatient extends Component {

    constructor(props){
        super(props);
        this.state = {
           currentDate:new Date()
        }
    }
    componentDidMount(){
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
