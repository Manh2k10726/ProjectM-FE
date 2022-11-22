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
const saveBulkScheduleDoctor = (data)=>{
    return axios.post(`/api/bulk-create-schedule`,data)
}
const  ScheduleDoctorByDate =(doctorId,date) =>{
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const  getExtraInfoDoctorById =(doctorId) =>{
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}
const  getProfileDoctorById =(doctorId) =>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const  postPatientBookAppointment =(data) =>{
    return axios.post(`/api/patient-book-appointment`,data)
}
const  postVerifyBookAppointment =(data) =>{
    return axios.post(`/api/patient-verify-book-appointment`,data)
}
const  createNewSpecialty =(data) =>{
    return axios.post(`/api/create-new-specialty`,data)
}
const  getAllSpecialty =() =>{
    return axios.get(`/api/get-all-specialty`)
}
const  getDetailSpecialty = (data) =>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const  createNewClinic =(data) =>{
    return axios.post(`/api/create-new-clinic`,data)
}
const  getAllClinic =() =>{
    return axios.get(`/api/get-all-clinic`)
}
export{handleLoginApi,getAllUsers,
    createNewUserService,delUserService,editUserService,
    getAllCodeService,getTopDoctorHomeService,getAllDoctors,saveDetailDoctor,
    getDetailInforDoctor,saveBulkScheduleDoctor,ScheduleDoctorByDate,
    getExtraInfoDoctorById,getProfileDoctorById,postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,getAllSpecialty,
    getDetailSpecialty,createNewClinic,getAllClinic
}