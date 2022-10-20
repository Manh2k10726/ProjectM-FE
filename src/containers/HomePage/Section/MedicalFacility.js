import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class MedicalFacility extends Component {

    render() {
        return (
            <Fragment>
               <div className='section-share section-medical '>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-slider'>
                    <Slider {...this.props.settings}>
                        <div className='section-custom'>
                            <div className='bg-img img-medical' ></div>
                            <div>Bệnh viện thu cúc</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-medical' ></div>
                            <div>tiêu hóa</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-medical' ></div>
                            <div>3</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-medical' ></div>
                            <div>4</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-medical' ></div>
                            <div>5</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-medical' ></div>
                            <div>6</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-medical' ></div>
                            <div>7</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-medical' ></div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
