import axios from "../axios"


const handleLoginAPI = (email, password) =>{
    //bien lay tu ham login ben nodejs
    return axios.post('/api/login', {email, password});
}
const getAllUsers = (inputID) =>{
    //template string
    return axios.get(`/api/get-all-users?id=${inputID}`)
}
const createNewUserService = (data) =>{
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userID) =>{
    return axios.delete('/api/delete-user', {
        data: {id: userID}
    })
}
const editUserService = (inputData) =>{
    return axios.put('/api/edit-user', inputData)
}
const getAllCodeService = (inputType) =>{
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}
const getDetailInforDoctor = (inputID) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputID}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctorByDate = (doctorID, date) =>{
    return axios.get(`api/get-schedule-doctor-by-date?doctorID=${doctorID}&date=${date}`)
}
const getExtraInforDoctorByID = (doctorID) =>{
    return axios.get(`api/get-extra-infor-doctor-by-id?doctorID=${doctorID}`)
}
const getProfileDoctorByID = (doctorID) =>{
    return axios.get(`api/get-profile-doctor-by-id?doctorID=${doctorID}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialty = () =>{
    return axios.get('/api/get-specialty')
}
const getAllDetailSpecialtyByID = (data) =>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinic = () =>{
    return axios.get('/api/get-clinic')
}
const getAllDetailClinicByID = (data) =>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
export {handleLoginAPI, getAllUsers, createNewUserService, deleteUserService,
editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctors,
saveDetailDoctorService, getDetailInforDoctor, saveBulkScheduleDoctor,
getScheduleDoctorByDate, getExtraInforDoctorByID, getProfileDoctorByID,
postPatientBookAppointment, createNewSpecialty, getAllSpecialty,
getAllDetailSpecialtyByID, createNewClinic, getAllClinic, getAllDetailClinicByID,

}