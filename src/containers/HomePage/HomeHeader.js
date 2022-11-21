import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import{LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    changeLanguage =(language)=>{
        this.props.changeLanguageAppRedux(language)
    }
    handleReturnHome=()=>{
        this.props.history.push(`/Home`)
    }
    handleToSpecialty=()=>{
        this.props.history.push(`/specialty`)
    }
    render() {
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
                            <div className='children-center-content' onClick={()=>this.handleToSpecialty()} >
                                <div><b><FormattedMessage id="home-header.speciality"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.search-doctor"/></div>
                            </div>
                            <div className='children-center-content'>
                                <div><b><FormattedMessage id="home-header.health-facility"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-room"/></div>
                            </div>
                            <div className='children-center-content'>
                                <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-doctor"/></div>
                            </div>
                            <div className='children-center-content'>
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
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1"/></div>
                            <div className='title2'><FormattedMessage id="banner.title2"/></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                            </div>
                        </div>
                        <div className='content-down'>
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
