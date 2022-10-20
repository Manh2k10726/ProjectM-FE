import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class Specialty extends Component {

  
    render() {
        return (
            <Fragment>
               <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-slider'>
                    <Slider {...this.props.settings}>
                        <div className='section-custom'>
                            <div className='bg-img img-specialty' ></div>
                            <div>cơ xương khớp</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-specialty' ></div>
                            <div>tiêu hóa</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-specialty' ></div>
                            <div>3</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-specialty' ></div>
                            <div>4</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-specialty' ></div>
                            <div>5</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-specialty' ></div>
                            <div>6</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-specialty' ></div>
                            <div>7</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-specialty' ></div>
                            <div>8</div>
                        </div>
                    </Slider>
                    </div>
                    
                </div>
               </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux:(language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
