import actionTypes from './actionTypes';
import { getAllCodeService,createNewUserService, getAllUsers,delUserService,editUserService,getTopDoctorHomeService, getAllDoctors,saveDetailDoctor } from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
export const fetchGenderStart = () => {
    return async(dispatch,getState) =>{
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed()); 
            }
          } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e)
          }
    }
  
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () => {
    return async(dispatch,getState) =>{
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed()); 
            }
          } catch (e) {
            dispatch(fetchPositionFailed()); 
            console.log(e)
          }
    }
  
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
    return async(dispatch,getState) =>{
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed()); 
            }
          } catch (e) {
            dispatch(fetchRoleFailed()); 
            console.log(e)
          }
    }
  
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const createNewUser = (data) => {
    return async(dispatch,getState) =>{
        try {
            let res = await createNewUserService(data) ;
            if (res && res.errCode === 0) {
                toast.success("Create a new user success")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Create new user error")
                dispatch(saveUserFailed()); 
            }
          } catch (e) {
            dispatch(saveUserFailed()); 
            
            console.log(e)
          }
    }
  
}
export const saveUserSuccess  = (roleData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: roleData
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

export const fetchAllUserStart = () => {
    return async(dispatch,getState) =>{
        try {
            let res = await getAllUsers("ALL");
            // let res1 =await getTopDoctorHomeService(3);
            // console.log('check get top doctor: ' ,res1)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed()); 
            }
          } catch (e) {
            dispatch(fetchAllUserFailed()); 
            console.log(e)
          }
    }
}

export const fetchAllUserSuccess  = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})
export const deleteUser = (userId) => {
    return async(dispatch,getState) =>{
        try {
            let res = await delUserService(userId) ;
            if (res && res.errCode === 0) {
                toast.success("Delete user success")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Delete user error")
                dispatch(deleteUserFailed()); 
            }
          } catch (e) {
            dispatch(deleteUserFailed()); 
            
            console.log(e)
          }
    }
  
}
export const deleteUserSuccess = ()=>({
    type:actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = ()=>({
    type:actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async(dispatch,getState) =>{
        try {
            let res = await editUserService(data) ;
            if (res && res.errCode === 0) {
                toast.success("Update user success")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Update user error")
                dispatch(editUserFailed()); 
            }
          } catch (e) {
            toast.error("Update user error")
            dispatch(editUserFailed()); 
            
            console.log(e)
          }
    }
  
}
export const editUserSuccess = ()=>({
    type:actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = ()=>({
    type:actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctors = ()=>{
    return async (dispatch,getState) =>{
        try {
            let res = await getTopDoctorHomeService(5) ;
            console.log('check res doctor: ',res)
            if (res && res.errCode === 0) {
               dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                dataDoctors:res.data
               })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                   })
            }
          } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
               })
            
            console.log(e)
          }
    } 
}
export const fetchAllDoctors = ()=>{
    return async (dispatch,getState) =>{
        try {
            let res = await getAllDoctors() ;
           
            if (res && res.errCode === 0) {
               dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                dataDr:res.data
               })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                   })
            }
          } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
               })
            
            console.log(e)
          }
    } 
}

export const SaveDetailDoctor = (data)=>{
    return async (dispatch,getState) =>{
        console.log(data)
        try {
            let res = await saveDetailDoctor(data) ;
           
            if (res && res.errCode === 0) {
                toast.success("Save info detail doctor the user succeed !")
               dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
               
               })
            } else {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                   })
                   toast.error("Save info detail doctor error !")
            }
          } catch (e) {
            toast.error("Save info detail doctor error !")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
               })
            
            console.log(e)
          }
    } 
}

export const fetchAllCodeScheduleTime = ()=>{
    return async (dispatch,getState) =>{
        try {
            let res = await getAllCodeService("TIME")
           
            if (res && res.errCode === 0) {
               dispatch({
                type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
                dataTime:res.data
               })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
                   })
            }
          } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
               })
            
            console.log(e)
          }
    } 
}