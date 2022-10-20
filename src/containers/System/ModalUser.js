import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:''
          };
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',() =>{
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:''
            })
        })
    }
    componentDidMount() {
    }
    toggle =()=>{
       this.props.toggleFromParent();
    }
    handleOnChangeInput = (event,id) =>{
        let copyState = {...this.state};
        copyState[id]= event.target.value;
        this.setState({
            ...copyState
        });
        
    }
    checkValidateInput =() => {
        let isValid = true;
        let arrInput =['email','password','firstName','lastName',"address"];
        for(let i = 0 ; i< arrInput.length;i++){
            console.log(this.state[arrInput[i]],[arrInput[i]])
            if(!this.state[arrInput[i]]){
                isValid =false;
                alert('Missing parameter: '+ arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () =>{
        let isValid = this.checkValidateInput();
        if(isValid == true){
            this.props.createNewUser(this.state);
            
        }
    }
    render() {
        return (
            <Modal size="lg" isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} className={"modal-user-container"}>
            <ModalHeader toggle={()=>{this.toggle()}}>Create new user</ModalHeader>
            <ModalBody>
                
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email :</label>
                            <input type='email' value={this.state.email}
                            onChange={(event)=> {this.handleOnChangeInput(event,'email')}}/>
                        </div>
                        <div className='input-container'>
                            <label>Password :</label>
                            <input type='password'value={this.state.password}
                            onChange={(event)=> {this.handleOnChangeInput(event,'password')}}/>
                        </div>
                        <div className='input-container'>
                            <label>firstName :</label>
                            <input type='text' value={this.state.firstName}
                            onChange={(event)=> {this.handleOnChangeInput(event,'firstName')}}/>
                        </div>
                        <div className='input-container'>
                            <label>LastName :</label>
                            <input type='text'value={this.state.lastName}
                            onChange={(event)=> {this.handleOnChangeInput(event,'lastName')}}/>
                        </div>
                        <div className='input-container max-w-input'>
                            <label>Address :</label>
                            <input type='text'value={this.state.address}
                            onChange={(event)=> {this.handleOnChangeInput(event,'address')}}/>
                        </div>
                </div>
                
             
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className='px-3' onClick={()=>{this.handleAddNewUser()}}>Add new</Button>{' '}
              <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>Close</Button>
            </ModalFooter>
          </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);