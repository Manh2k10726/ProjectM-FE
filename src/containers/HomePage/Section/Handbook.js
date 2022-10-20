import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class Handbook extends Component {

    render() {
        return (
            <Fragment>
               <div className='section-share section-handbook '>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-slider'>
                    <Slider {...this.props.settings}>
                        <div className='section-custom'>
                            <div className='bg-img img-handbook' ></div>
                            <div>Khám nam học,bệnh viện Nam học</div>
                            <div>giáo sư </div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-handbook' ></div>
                            <div>Khám nam học,bệnh viện Nam học 2</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-handbook' ></div>
                            <div>Khám nam học,bệnh viện Nam học</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-handbook' ></div>
                            <div>Khám nam học,bệnh viện Nam học 2</div>
                        </div>
                        <div className='section-custom'>
                            <div className='bg-img img-handbook' ></div>
                            <div>Khám nam học,bệnh viện Nam học</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
