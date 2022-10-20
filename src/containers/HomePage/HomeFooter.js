import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

    render() {
        return (
            <Fragment>
               <div className='home-footer '>
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
