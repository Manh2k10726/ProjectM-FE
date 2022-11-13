import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES,CommonUtils } from '../../../utils';
import {createNewSpecialty} from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props){
        super(props);
        this.state = {
           name:'',
           imageBase64:'',
           descriptionHTML:'',
           descriptionMarkdown:''
        }
    }
    async componentDidMount(){
        
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        
    }
    handleOnchangeInput = (event,id)=>{
        let stateCopy = {...this.state};
        stateCopy[id]=event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleOnchangeImg =async (event)=>{
        let data =event.target.files;
        let file =data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl =URL.createObjectURL(file);
            this.setState({
                imageBase64:objectUrl,
                // avatar:base64
            })
            
        }
    }
    handleSaveSpecialty =async()=>{
        let res = await createNewSpecialty(this.state);
        if(res && res.errCode === 0){
            toast.success('Add new specialty succeeds !!!')
        }else{
            toast.error('Error, Plz try again ...')
        }
    }
     // Finish!
     handleEditorChange=({ html, text }) =>{
        this.setState({
            descriptionMarkdown:text,
            descriptionHTML:html,
        })
        
    }
    render() {
       
        return (
            <Fragment>
                <div className='specialty-container'>
                    <div className='ms-title'> Quan ly chuyen khoa</div>
                   
                   <div className='specialty-all-list row'>
                        <div className='col-6 form-group'>
                            <label>Tên chuyên khoa :</label>
                            <input className='form-control' type="text"
                                value={this.state.name}
                                onChange={(event)=> this.handleOnchangeInput(event,'name')}
                            />
                        </div>
                        
                        <div className='col-6 form-group'>
                            <label>Ảnh chuyên khoa :</label>
                            <input className='form-control-file' type='file'
                                onChange={(event)=>this.handleOnchangeImg(event )}
                            />
                        </div>
                        <div className='col-12'>
                            <MdEditor style={{ height: '450px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12  btn-add-new-specialty'>
                            <button className=' btn button '
                                onClick={()=>this.handleSaveSpecialty()}
                            >
                                Add new
                            </button>
                        </div>   
                    
                   </div>
                </div>
                

            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
