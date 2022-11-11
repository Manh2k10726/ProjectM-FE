import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import{LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions/appActions';
import './HomeFooter.scss';


class HomeFooter extends Component {

    handleReturnHome=()=>{
        this.props.history.push(`/Home`);
    }
    render() {
        return (
            <Fragment>
               <div className='home-footer '>
                    <footer class="footer-distributed">

                        <div class="footer-left">

                        <div onClick={()=> this.handleReturnHome()} className='header-logo'></div>

                            <p class="footer-links">
                                <a onClick={()=> this.handleReturnHome()} >Home</a>
                                <a href="#">Blog</a>
                                <a href="#">About</a>
                                <a href="#">Contact</a>
                            </p>

                            <p class="footer-company-name">Demo Booking Care © 2022</p>
                            </div>

                            <div class="footer-center">

                            <div>
                                <i class="fa fa-map-marker"></i>
                                <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
                            </div>

                            <div>
                                <i class="fa fa-phone"></i>
                                <p>+1.555.555.5555</p>
                            </div>

                            <div>
                                <i class="fa fa-envelope"></i>
                                <p><a href="mailto:support@company.com">support@company.com</a></p>
                            </div>

                            </div>

                            <div class="footer-right">

                            <p class="footer-company-about">
                                <span>About the company</span>
                                Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                            </p>

                            <div class="footer-icons">
                            
                                <a className='fb' href="#"><i className="fab fa-facebook-f "></i></a>
                                <a className='yt' href="#"><i className="fab fa-youtube"></i></a>
                                <a className='instagram' href="#"><i className="fab fa-instagram "></i></a>
                                <a className='git' href="#"><i className="fab fa-github git"></i></a>

                            </div>

                            </div>

                    </footer>
                    <p className='detail-footer'>&copy; 2022 Demo Booking Care. More information, please visit my youtube channel.<a target='_blank' href='https://www.youtube.com/watch?v=o0aFiNTxFR0&t=2796s'>&#8594; Click here &#8592;</a></p>
               </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
