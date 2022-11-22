import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import moment from 'moment';
import {getAllSpecialty} from '../../../services/userService'
import * as actions from '../../../store/actions';
import {Link} from 'react-router-dom'

class SearchDoctor extends Component {
    constructor(props){
        super(props)
        this.state ={
            arrDoctor:[]
        }
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctor:this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount(){
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor=(doctor)=>{
        // console.log('view infor: ',doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        // console.log('check top doctor:',this.props.topDoctorsRedux)
        let arrDoctor = this.state.arrDoctor;
        arrDoctor=arrDoctor.concat(arrDoctor).concat(arrDoctor)
        let {language}=this.props;
        return (
            <Fragment>
            <HomeHeader/>
               <div className='section-share  '>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="home-page.out-standing-doctor"/></span>
                        
                    </div>
                    <div className='section-slider'>
                    <div>
                        
                        {arrDoctor && arrDoctor.length >0 &&  arrDoctor.map((item,index)=>{
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image,'base64').toString('binary');
                            }
                            let nameVi=`${item.positionData.valueVi},${item.lastName}${item.firstName}`;
                            let nameEn=`${item.positionData.valueEn},${item.firstName}${item.lastName}`;
                            return(
                                <div className='section-custom' key={index} onClick={()=> this.handleViewDetailDoctor(item)}>
                                    <div className='border-custom'>
                                        <div className='outer-bg'><div className='bg-img img-doctor' style={{ backgroundImage:`url(${imageBase64})` }}>
                                            
                                        </div>
                                    </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi:nameEn}</div>
                                                
                                            </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                    
                </div>
                <HomeFooter/>
               </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () =>dispatch(actions.fetchTopDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchDoctor));
