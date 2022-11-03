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
            // save to markdown
           contentMarkdown:'',
           contentHTML:'',
           selectedDoctor: '',
           description:'',
           listDoctors: [],
           hasOldData:false,
           //save to doctor_info table
           listPrice: [],
           listPayment: [],
           listProvince: [],
           selectedPrice:'',
           selectedPayment:'',
           selectedProvince:'',
           nameClinic:'',
           addressClinic:'',
           note:''
        }
    }
    componentDidMount(){
       this.props.fetchAllDoctorsRedux();
       this.props.getRequiredDoctorInfo();
    }
    
    
    handelSaveContentMarkdown=()=>{
        let {hasOldData} = this.state;
        console.log("has" , hasOldData)
        this.props.SaveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice:this.state.selectedPrice.value,
            selectedPayment:this.state.selectedPayment.value,
            selectedProvince:this.state.selectedProvince.value,
            nameClinic:this.state.nameClinic,
            addressClinic:this.state.addressClinic,
            note:this.state.note
        })
        
    }
     // Finish!
    handleEditorChange=({ html, text }) =>{
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
        
    }
    handleChangeSelect =async (selectedDoctor,) => {
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
        // console.log('selectedDoctor :',name)
        // console.log(`Option selected:`, res)
        // console.log("drop", this.state.contentMarkdown)

    }


    handelOnChangeText = (event ,id)=>{
        let stateCopy ={...this.state};
        stateCopy[id] =  event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    buildDataInputSelect = (inputData, type) =>{
        let result = [];
        let {language}=this.props;
        if(inputData && inputData.length >0){
            if (type === 'USERS') {
                inputData.map((item,index)=>{
                    let object={};
                    let labelVi=  `${item.lastName} ${item.firstName}` ;
                    let labelEn=  `${item.firstName} ${item.lastName}` ;
                    object.label=language ===LANGUAGES.VI ?labelVi:labelEn; 
                    object.value=item.id;
                    result.push(object)
                })
            }
            if (type == 'PRICE') {
                inputData.map((item,index)=>{
                    let object={};
                    let labelVi=  `${item.valueVi} VNĐ`;
                    let labelEn=  `${item.valueEn} USD` ;
                    object.label=language ===LANGUAGES.VI ?labelVi:labelEn; 
                    object.value=item.keyMap;
                    result.push(object)
                })
                console.log('check price',inputData)
            }
            
            if ( type === 'PAYMENT'|| type ==='PROVINCE') {
                inputData.map((item,index)=>{
                    let object={};
                    let labelVi=  `${item.valueVi}`;
                    let labelEn=  `${item.valueEn}` ;
                    object.label=language ===LANGUAGES.VI ?labelVi:labelEn; 
                    object.value=item.keyMap;
                    result.push(object)
                })
                console.log('check price',inputData)
            }
        }
        return result;
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if (prevProps.allDoctor !== this.props.allDoctor) {
         let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
         this.setState({
             listDoctors: dataSelect
         })
        } 
        if(prevProps.language !== this.props.language){
         let {resPrice,resPayment,resProvince}=this.props.allRequiredDoctorInfo;
         let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE')
         let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT')
         let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE')
         let dataSelect = this.buildDataInputSelect(this.props.allDoctor,'USERS')
         this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listDoctors: dataSelect,
         })
        }
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
         let {resPrice,resPayment,resProvince}=this.props.allRequiredDoctorInfo;
         let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE')
         let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT')
         let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE')
 
         console.log('check data new select' ,dataSelectPrice,dataSelectPayment,dataSelectProvince)
         this.setState({
             listPrice: dataSelectPrice,
            listPayment: dataSelectPayment,
            listProvince: dataSelectProvince,
         })
        }
     }
     handelOnChangeSelectDoctorInfo =async (selectedDoctor,name)=>{
        // this.setState({ selectedDoctor });
        let stateName =name.name;
        let stateCopy={...this.state};
        stateCopy[stateName]=selectedDoctor;
        this.setState({
            ...stateCopy
        })
        console.log('check name select on change',selectedDoctor , name)
     }
    render() {
        let {hasOldData} = this.state;
        console.log('check state:',this.state)
        return (
            <Fragment>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'><FormattedMessage id="doctor-schedule.title"/></div>
                    <div className='more-info'>
                        <div className='content-left form-group'>
                             <label><FormattedMessage id="doctor-schedule.select-doctor"/></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                name={'selectedDoctor'}
                                placeholder={<FormattedMessage id="doctor-schedule.select-doctor"/>}
                            />
                        </div>
                        <div className='content-right'>
                        <label><FormattedMessage id="doctor-schedule.info-doctor"/>: </label>
                            <textarea className='form-control'rows="4"
                                onChange={(event)=> this.handelOnChangeText(event,'description')}
                                value={this.state.description}>

                             </textarea>
                        </div>
                    </div>
                    <div className='more-info-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="doctor-schedule.price"/></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handelOnChangeSelectDoctorInfo}
                                options={this.state.listPrice}
                                name="selectedPrice"
                                placeholder={<FormattedMessage id="doctor-schedule.price"/>}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="doctor-schedule.payment"/></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handelOnChangeSelectDoctorInfo}
                                options={this.state.listPayment}
                                name="selectedPayment"
                                placeholder={<FormattedMessage id="doctor-schedule.payment"/>}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="doctor-schedule.province"/></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handelOnChangeSelectDoctorInfo}
                                options={this.state.listProvince}
                                name="selectedProvince"
                                placeholder={<FormattedMessage id="doctor-schedule.province"/>}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="doctor-schedule.ClinicName"/> </label>
                            <input
                                onChange={(event)=> this.handelOnChangeText(event,'nameClinic')}
                                value={this.state.nameClinic}
                                 className='form-control'
                             />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="doctor-schedule.addressClinic"/></label>
                            <input
                                onChange={(event)=> this.handelOnChangeText(event,'addressClinic')}
                                value={this.state.addressClinic}
                                 className='form-control'
                             />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="doctor-schedule.note"/></label>
                            <input
                                onChange={(event)=> this.handelOnChangeText(event,'note')}
                                value={this.state.note}
                                 className='form-control'
                             />
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
                    >{hasOldData === true ? <span><FormattedMessage id="doctor-schedule.edit-doctor"/></span> : <span><FormattedMessage id="doctor-schedule.save-doctor"/></span> }</button>
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctor:state.admin.allDoctor,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    // console.log("drop", props.contentMarkdown)
    return {
        getRequiredDoctorInfo:()=>dispatch(actions.getRequiredDoctorInfo()),
       fetchAllDoctorsRedux: ()=> dispatch(actions.fetchAllDoctors()),
       SaveDetailDoctor:(data)=>dispatch(actions.SaveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
