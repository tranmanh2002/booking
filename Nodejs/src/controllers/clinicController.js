import clinicService from '../services/clinicService';

let createClinic = async (req, res) =>{
    try {
        let infor = await clinicService.createClinic(req.body);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lôi từ phía server'
        })
    }
}
let getAllClinic = async (req, res) =>{
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lôi từ phía server'
        })
    }
}
let getDetailClinicByID = async (req, res) =>{
    try {
        let infor = await clinicService.getDetailClinicByID(req.query.id);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lôi từ phía server'
        })
    }
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicByID: getDetailClinicByID,

}