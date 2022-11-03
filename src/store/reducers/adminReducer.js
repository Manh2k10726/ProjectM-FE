import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender:false,
   genders:[],
   role:[],
   position:[],
   users:[],
   topDoctor:[],
   allScheduleTime:[],

   allRequiredDoctorInfo:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            // let state = {...state};
            state.isLoadingGender =true;
            return {
                ...state,
                
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // let copy2State = {...state};
            state.genders =action.data;
            state.isLoadingGender =false;
            console.log("check success",state)
            return {
                ...state,
                // isLoggedIn: false,
                // userInfo: null
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // let copyState = {...state};
            state.isLoadingGender =false;
            state.genders=[];   
            return {
                ...state,
                // isLoggedIn: false,
                // userInfo: null
            }
            case actionTypes.FETCH_POSITION_SUCCESS:
            
            state.position =action.data;
            return {
                ...state,

            }
            case actionTypes.FETCH_POSITION_FAILED:
                
                state.position=[];   
                return {
                    ...state,
                    
                }
            case actionTypes.FETCH_ROLE_SUCCESS:
            
            state.role =action.data;
            return {
                ...state,

            }
            case actionTypes.FETCH_ROLE_FAILED:
                
                state.role=[];   
                return {
                    ...state,
                    
                }
            case actionTypes.FETCH_ALL_USER_SUCCESS:
            
            state.users =action.users;
            return {
                ...state,

            }
            case actionTypes.FETCH_ALL_USER_FAILED:
                
                state.users=[];   
                return {
                    ...state, 
                }
            case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
                
                state.topDoctor=action.dataDoctors;   
                return {
                    ...state, 
                }
            case actionTypes.FETCH_TOP_DOCTOR_FAILED:
                
                state.topDoctor=[];   
                return {
                    ...state, 
                }
            case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
                
                state.allDoctor=action.dataDr;   
                return {
                    ...state, 
                }
            case actionTypes.FETCH_ALL_DOCTOR_FAILED:
                
                state.allDoctor=[];   
                return {
                    ...state, 
                }
            case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS:
                
                state.allScheduleTime=action.dataTime;   
                return {
                    ...state, 
                }
            case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED:
                
                state.allScheduleTime=[];   
                return {
                    ...state, 
                }
            case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
                
                state.allRequiredDoctorInfo=action.data;   
                // console.log('check getRequiredDoctorInfo:',action)
                return {
                    ...state, 
                }
            case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
                
                state.allRequiredDoctorInfo=[];   
                return {
                    ...state, 
                }
        default:
            return state;
    }
}

export default adminReducer;