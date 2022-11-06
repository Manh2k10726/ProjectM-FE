import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss'

class HomeFooter extends Component {

    render() {
        return (
            <Fragment>
               <div className='home-footer '>
                    <footer class="footer-distributed">

                        <div class="footer-left">

                        <div className='header-logo'></div>

                            <p class="footer-links">
                                <a href="#" class="link-1">Home</a>
                                
                                <a href="#">Blog</a>
                            
                                <a href="#">Pricing</a>
                            
                                <a href="#">About</a>
                                
                                <a href="#">Faq</a>
                                
                                <a href="#">Contact</a>
                            </p>

                            <p class="footer-company-name">Company Name © 2022</p>
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
                            
                                <a href="#"><i className="fab fa-facebook"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                                <a href="#"><i className="fab fa-github"></i></a>

                            </div>

                            </div>

                    </footer>
                    <p>&copy; 2022 Demo Booking Care. More information, please visit my youtube channel.<a target='_blank' href='https://youtu.be/2rJSCXSWncQ'>&#8594; Click here &#8592;</a></p>
               </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
