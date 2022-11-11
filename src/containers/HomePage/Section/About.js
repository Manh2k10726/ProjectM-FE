import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

class About extends Component {

    render() {
        return (
            <Fragment>
               <div className='section-share section-about '>
                    <div className='section-about-header'> Đánh giá từ chuyên gia</div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            {/* <iframe width="100%" height="400px" src="https://www.youtube.com/embed/2rJSCXSWncQ" 
                                title="#59 Debugs Redux Từ A đến Z và Thực Hiện CRUD Với Redux - CREATE | Redux-React Cho Người Mới Bắt Đầu" 
                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe> */}
                            <iframe width="100%" height="400px" src="https://www.youtube.com/embed/o0aFiNTxFR0"
                              title="formick" frameborder="0" allow="accelerometer; autoplay; clipboard-write;
                              encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>
                        </div>
                        <div className='content-right'>
                            <p>
                            Trong video này, chúng ta sẽ cùng nhau thực hiện Debugs để xem luồng chạy của code,
                         từng dòng một giữa Redux và ứng dụng React. Ngoài ra,
                         chúng ra sẽ ghép API tạo người dùng để có thể thêm mới người dùng luôn.
                            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
