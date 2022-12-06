import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import{LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { searchDataHome } from '../../services/userService';


class HomeHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkHidden:false,
            arrSpecialty:[],
            fullName:''
        }
    }
    handleOnchangeInput=(event,id)=>{
        this.setState({
            fullName: event.target.value,
            checkHidden:true,
        }
        ,()=>{
            let name = this.state.fullName
            this.getAllSpecialtySearch(name);
            console.log('name',name)
        }
        )
    
    }
    async componentDidMount(){
        let name = this.state.fullName
       await this.getAllSpecialtySearch(name);
    }
    getAllSpecialtySearch = async(name)=>{
        let res = await searchDataHome(name);
        if(res && res.errCode === 0){
            this.setState({
                arrSpecialty: res.data
            })
        }
        console.log('check response:',name)
    }
    changeLanguage =(language)=>{
        this.props.changeLanguageAppRedux(language)
    }
    handleReturnHome=()=>{
        this.props.history.push(`/Home`)
    }
    handleToSpecialty=()=>{
        this.props.history.push(`/specialty`)
    }
    handleToDoctor=()=>{
        this.props.history.push(`/doctors`)
    }
    
    handelSearch = ()=>{
        this.setState({
            checkHidden:true
        },()=>{
            let name = this.state.fullName
            this.getAllSpecialtySearch(name);
            console.log('name',name)
        }
        )
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
    handleViewDetailSpecialty=(item)=>{
        this.props.history.push(`/detail-specialty/${item.id}`)
    }
    render() {
        let {arrSpecialty,checkHidden}=this.state;
        console.log('check arrSpecialty',this.state.arrSpecialty)
        let language = this.props.language;
        return (
            <Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='header-nar'><i className="fas fa-bars "></i></div>
                            <div className='header-logo' onClick={()=>this.handleReturnHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='children-center-content ss1' onClick={()=>this.handleToSpecialty()} >
                                <div><b><FormattedMessage id="home-header.speciality"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.search-doctor"/></div>
                            </div>
                            <div className='children-center-content ss2'onClick={()=>this.handleToSpecialty()}>
                                <div><b><FormattedMessage id="home-header.health-facility"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-room"/></div>
                            </div>
                            <div className='children-center-content ss3'onClick={()=>this.handleToDoctor()}>
                                <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-doctor"/></div>
                            </div>
                            <div className='children-center-content ss4'onClick={()=>this.handleToSpecialty()}>
                                <div><b><FormattedMessage id="home-header.medical-package"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.General-health-check"/></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i> <FormattedMessage id="home-header.support"/></div>
                            <div className={language===LANGUAGES.VI ? 'language-vi active':'language-vi '}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language===LANGUAGES.EN ? 'language-en active':'language-en '} ><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner == true &&
                    <div className='home-header-banner' >
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1"/></div>
                            <div className='title2'><FormattedMessage id="banner.title2"/></div>
                            
                            { checkHidden===true?
                            <>
                            <div className='search'>
                            <input  onChange={(event)=> this.handleOnchangeInput(event,'fullName')} 
                                value={this.state.fullName} type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                            <i className='fas fa-times'  onClick={()=>this.handelClickShow()} ></i>
                            </div> 
                            <div className='result'>
                            {arrSpecialty && arrSpecialty.length >0 &&
                                arrSpecialty.map((item,index)=>{
                                return(
                                    <div className='section-name-custom' key={index}
                                     onClick={()=> this.handleViewDetailSpecialty(item)}
                                     >
                                        <div className='name-custom'>
                                            <div>{item.name}</div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                            </div>
                            </>
                            :<>
                            <div className='search'>
                            <input  onChange={(event)=> this.handleOnchangeInput(event,'fullName')}  value={this.state.fullName} 
                            type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                            <i className='fas fa-search' onClick={()=>this.handelSearch()} ></i>
                            </div>
                            </>
                            }
                        </div>
                        <div className='content-down'onClick={()=>this.handelClickShow()}>
                            <div className='options'>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child"/></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child2"/></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child3"/></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-flask'></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child4"/></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-capsules"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child5"/></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-eye-dropper"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child6"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo:state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux:(language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
