import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import '../../styles/styles.scss';
import { handleLoginApi } from '../../services/userService';
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
    //constructor dung khai bao cac sate
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            isShowpass:'',
            errMessage:''
        }
   
    }
    handleOnChangeUsername = (event) =>{
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value)
    }
    handleOnChangePassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    }
    handleLogin =async ()=>{
        this.setState({
            errMessage:''
        })
        try {
            let data=await handleLoginApi(this.state.username,this.state.password);
            if(data && data.errCode !==0){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                     errMessage: error.response.data.message
                    })
                }
            }
            
        }
        
    }
    handelShowHidePassWord =()=>{
        this.setState({
            isShowpass: !this.state.isShowpass 
        })
    }

    render() {
        //JSX
        return (
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>
                            Login
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Enter your username' value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowpass ? 'text' : 'password'}
                                className='form-control' 
                                placeholder='Enter your password' value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)}></input>
                                <span
                                onClick={()=>{
                                    this.handelShowHidePassWord()
                                }}>
                                    <i className={this.state.isShowpass ? "fas fa-eye eye" : 'fas fa-eye-slash eye' }></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 ' style={{ color:'red'}}>
                                {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='login-btn' onClick={() =>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='login-forgot'>forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'> 
                            <span className='text'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            {/* <i className='fa fa-google-plus-g gg'> G</i> */}
                            <i className="fab fa-google gg"></i>
                            <i className="fab fa-facebook-square fb"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo)=> dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
