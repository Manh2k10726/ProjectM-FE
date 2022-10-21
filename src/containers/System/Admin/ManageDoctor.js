import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {
/**life cycle (vong doi react)
 * run component:
 * 1. chay tu constructor -> init state
 * 2. ham Did mount (set state,goi api,lay gia tri):born,   unmount
 * 3. Render du lieu (re-render)
 */
    constructor(props){
        super(props);
        this.state = {
           contentMarkdown:'',
           contentHTML:'',
           selectedDoctor: '',
           description:'',
           listDoctors: [],
           hasOldData:false
        }
    }
    componentDidMount(){
       this.props.fetchAllDoctorsRedux()
    }
    componentDidUpdate(prevProps,prevState,snapshot){
       if (prevProps.allDoctor !== this.props.allDoctor) {
        let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
        this.setState({
            listDoctors: dataSelect
        })
       } 
       if(prevProps.language !== this.props.language){
        let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
        this.setState({
            listDoctors: dataSelect
        })
       }
    }
    
    handelSaveContentMarkdown=()=>{
        let {hasOldData} = this.state;
        console.log("has" , hasOldData)
        this.props.SaveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        
    }
     // Finish!
    handleEditorChange=({ html, text }) =>{
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
        
    }
    handleChangeSelect =async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if(res && res.errCode === 0 && res.data && res.data.markdown){
            let Markdown = res.data.markdown;
            this.setState({
                contentHTML: Markdown.contentHTML,
                contentMarkdown: Markdown.contentMarkdown,
                description: Markdown.description,
                hasOldData:true
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData:false
            })
        }
        console.log(`Option selected:`, res)
        console.log("drop", this.state.contentMarkdown)

    }


    handelOnChangeDesc = (event)=>{
        this.setState({
            description: event.target.value
        })
    }
    buildDataInputSelect = (inputData) =>{
        let result = [];
        let {language}=this.props;
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
                let object={};
                let labelVi=`${item.lastName} ${item.firstName}`;
                let labelEn=`${item.firstName} ${item.lastName}`;
                object.label=language ===LANGUAGES.VI ?labelVi:labelEn; 
                object.value=item.id;
                result.push(object)
            })
          
        }
        return result;
    }
    render() {
        let {hasOldData} = this.state;
        let arrUsers = this.state.usersRedux;
        return (
            <Fragment>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Cập nhật thông tin bác sĩ</div>
                    <div className='more-info'>
                        <div className='content-left form-group'>
                             <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='content-right'>
                        <label>Thông tin giới thiệu: </label>
                            <textarea className='form-control'rows="4"
                            onChange={(event)=> this.handelOnChangeDesc(event)}
                            value={this.state.description}>

                             </textarea>
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}/>
                    </div>
                    <button className={hasOldData === true ? 'save-content-markdown' : 'create-content-markdown' }
                    onClick={()=>this.handelSaveContentMarkdown()}
                    >{hasOldData === true ? <span>Sửa thông tin</span> : <span>Tạo thông tin</span> }</button>
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctor:state.admin.allDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    // console.log("drop", props.contentMarkdown)
    return {
       
       fetchAllDoctorsRedux: ()=> dispatch(actions.fetchAllDoctors()),
       SaveDetailDoctor:(data)=>dispatch(actions.SaveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
