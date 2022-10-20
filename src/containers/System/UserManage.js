import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import{getAllUsers,createNewUserService,delUserService,editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter'
 
class UserManage extends Component {
/**life cycle (vong doi react)
 * run component:
 * 1. chay tu constructor -> init state
 * 2. ham Did mount (set state,goi api,lay gia tri):born,   unmount
 * 3. Render du lieu (re-render)
 */
    constructor(props){
        super(props);
        this.state = {
            arrUser:[],
            isOpenModalUser:false,
            isOpenModalEditUser:false,
            userEdit:{}
        }
    }

    async componentDidMount() {
       await this.getAllUsersFormReact();
    }
    getAllUsersFormReact = async()=>{
        let response =await getAllUsers('ALL');
        if(response && response.errCode ===0){
            this.setState({
                arrUser: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser:true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser,
        })
    } 
    toggleUserEditModal= ()=>{
        this.setState({
            isOpenModalEditUser:!this.state.isOpenModalEditUser,
        })
    }
    createNewUser =async (data) =>{
        try {
            let response =await createNewUserService(data);
            if (response && response.errCode !==0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFormReact();
                this.setState({
                    isOpenModalUser:false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
            
        } catch (e) {
            console.log(e)
        }
        console.log('check data ',data)
    }
    handleDelUser= async (user)=>{
        console.log('click me',user)
        try {
            let res = await delUserService(user.id) ;
            console.log(res)
            if (res && res.errCode ===0) {
                await this.getAllUsersFormReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
            
        }
    }
    handleEditUser = async (user)=>{
        console.log('edit',user);
        this.setState({
            isOpenModalEditUser:true,
            userEdit:user
        })
    }
    handleDoEditUser= async (user)=>{
        
        try {
            let res =await editUserService(user);
            console.log(res)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUsersFormReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
            
        }
        
    }
    render() {
        let arrUser = this.state.arrUser;
        return (
            <div className="user-container">
                <ModalUser
                isOpen={this.state.isOpenModalUser}
                toggleFromParent={this.toggleUserModal}
                createNewUser={this.createNewUser}
                />
                {
                this.state.isOpenModalEditUser &&
                <ModalEditUser
                isOpen={this.state.isOpenModalEditUser}
                toggleFromParent={this.toggleUserEditModal}
                currentUser={this.state.userEdit}
                editUser={this.handleDoEditUser}
                />
                }
                
                <div className='title text-center'>
                        Manage User
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={()=> this.handleAddNewUser()}
                    ><i className="fas fa-plus-circle"></i> Add New User</button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {
                                arrUser && arrUser.map((item,index) => {
                                    return(
                                        <tr>
                                            <td> {item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={()=> this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-del' onClick={()=> this.handleDelUser(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            
                            </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
