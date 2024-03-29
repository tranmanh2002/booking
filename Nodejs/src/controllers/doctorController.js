import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) =>{
    let limit = req.query.limit;
    //lay toi da 10 bản ghi bác sĩ
    if(!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(limit);
        // console.log('checck respon: ', response)

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ phía server"
        })
    }
}
let getAllDoctors = async(req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ phía server'
        })
    }
}
let postInforDoctors = async (req, res) =>{
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ phía server'
        })
    }
}
let getDetailDoctorByID = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctor(req.query.id);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ phía server'
        })
    }
}
let bulkCreateSchedule = async (req,res) =>{
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Lỗi từ phía server"
        })
    }
}
let getScheduleByDate = async (req,res) =>{
    try {
        let infor = await doctorService.getScheduleByDate(req.query.doctorID, req.query.date);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Lỗi từ phía server"
        })
    }
}
let getExtraInforDoctorByID = async (req,res) =>{
    try {
        let infor = await doctorService.getExtraInforDoctorByID(req.query.doctorID);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Lỗi từ phía server"
        })
    }
}
let getProfileDoctorByID = async (req,res) =>{
    try {
        let infor = await doctorService.getProfileDoctorByID(req.query.doctorID);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Lỗi từ phía server"
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctors: postInforDoctors,
    getDetailDoctorByID: getDetailDoctorByID,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorByID: getExtraInforDoctorByID,
    getProfileDoctorByID: getProfileDoctorByID,

     
}
