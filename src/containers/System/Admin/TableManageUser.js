import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {
/**life cycle (vong doi react)
 * run component:
 * 1. chay tu constructor -> init state
 * 2. ham Did mount (set state,goi api,lay gia tri):born,   unmount
 * 3. Render du lieu (re-render)
 */
    constructor(props){
        super(props);
        this.state = {
           
        }
    }
    componentDidMount(){
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser=(user)=>{
        this.props.deleteUserRedux(user.id);
    }
    handleEditUser= (user)=>{
        this.props.handleEditUserFromParent(user)
    }
    render() {
        console.log("check list user",this.props.listUsers)
        let arrUsers = this.state.usersRedux;
        return (
            <Fragment>
                <div className="user-container">
                    
                    <div className='title text-center'>
                            Manage User
                    </div>
                    
                    <div className='user-table mt-3 mx-1'>
                        <table id ="TableManageUser">
                            <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                    <td> {item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'onClick={() => this.handleEditUser(item)} ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-del' onClick={() => this.handleDeleteUser(item)} ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                )
                        })}
                                </tbody>
                        </table>
                    </div>
                </div>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id)=> dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
