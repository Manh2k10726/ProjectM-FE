import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {getDataSearch} from '../../../services/userService';
import _ from 'lodash';

class SearchModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataDetailSpecialty:''  
          };
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.name){
            
            let name= this.props.match.params.name;
           
            let res= await getDataSearch({
                name : name ,
            });
            if(res && res.errCode === 0 ){
                let data = res.data;
                let arrDoctorId=[];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
               
                this.setState({
                    dataDetailSpecialty:res.data,
                    arrDoctorId:arrDoctorId,
                })
            }
        }
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
        let {isOpenModal,handleCloseModal}=this.props;
        let {dataDetailSpecialty} = this.state
        return (
            <Modal size="lg" isOpen={isOpenModal}  className={"modal-user-container"}>
            
            <ModalBody>
                
                    <div className='modal-user-body'>
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                                &&<div >
                                      {dataDetailSpecialty.name }
                                </div>
                            } 
                </div>
                
             
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" className='px-3'
                            onClick={handleCloseModal}
                >Close</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);