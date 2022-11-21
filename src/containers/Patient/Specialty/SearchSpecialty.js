import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import moment from 'moment';
import {getAllSpecialty} from '../../../services/userService'
import {Link} from 'react-router-dom'

class SearchSpecialty extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSpecialty:[]
        }
    }
    async componentDidMount(){
        let res = await getAllSpecialty();
    if(res && res.errCode === 0){
        this.setState({
            dataSpecialty:res.data ?res.data:[]
        })
    }
     }
    
    async componentDidUpdate(prevProps,prevState,snapshot){
       
} 
handleViewDetailSpecialty=(item)=>{
    this.props.history.push(`/detail-specialty/${item.id}`)
}
render() {
    let{dataSpecialty}= this.state;
    return (
        <Fragment>
            <HomeHeader/>
           <div className='section-share '>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id="home-page.specialty"/>:</span>
                </div>
                <div className='section-slider'>
                <div >
                    {dataSpecialty && dataSpecialty.length >0 &&
                     dataSpecialty.map((item,index)=>{
                        return(
                            <div className='section-custom' key={index} onClick={()=> this.handleViewDetailSpecialty(item)}>
                                <div className='border-custom'>

                                <div className='bg-img img-specialty'style={{ backgroundImage:`url(${item.image})` }} ></div>
                                <div>{item.name}</div>
                                </div>
                            </div>
                        )
                     }
                     )}
                   
                </div>
                </div>
                
            </div>
            <HomeFooter/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchSpecialty));
