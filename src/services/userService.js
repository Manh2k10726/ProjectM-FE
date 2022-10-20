import axios from "../axios";

 const handleLoginApi = (email,password) =>{
    return axios.post('/api/login', { email , password });
}
const getAllUsers =(inputId)=>{
    return axios.get(`/api/get-all-user?id=${inputId}`)
}
const createNewUserService =(data)=>{
    return axios.post('/api/create-new-user',data)
}
const delUserService = (userId)=>{
    return axios.delete('/api/delete-user',{
        data:{id: userId}});
}
const editUserService = (inputData)=>{
    return axios.put('/api/edit-user',inputData)
}
const getAllCodeService = (inputType)=>{
    return axios.get(`/api/all-code?type=${inputType}`)
}
const getTopDoctorHomeService = (limit)=>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = ()=>{
    return axios.get(`/api/get-all-doctor`)
}
const saveDetailDoctor = (data)=>{
    return axios.post(`/api/save-info-doctor`,data)
}
const getDetailInforDoctor = (inputId)=>{
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
export{handleLoginApi,getAllUsers,
    createNewUserService,delUserService,editUserService,
    getAllCodeService,getTopDoctorHomeService,getAllDoctors,saveDetailDoctor,
    getDetailInforDoctor,
}