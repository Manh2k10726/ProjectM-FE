import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import MedicalFacility from './Section/MedicalFacility';
import Specialty from './Section/Specialty';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook'
import './HomePage.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
   
    render() {
        let settings = {
            dots: false,
            infinite: false,
            // autoplay: true,
            autoplaySpeed: 2000,
            cssEase: "linear",
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 2,

          };
          let setting = {
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            cssEase: "linear",
            speed: 700,
            slidesToShow: 2,
            slidesToScroll: 1
          };
          const { isLoggedIn,userInfo } = this.props;
        console.log('userInfo:',userInfo)
        return (
            <div>
                <HomeHeader isShowBanner={true}/>
                <Specialty settings={settings}/>
                <MedicalFacility settings={settings}/>
                <OutStandingDoctor settings={settings}/>
                <Handbook settings={setting}/>
                <About/>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
