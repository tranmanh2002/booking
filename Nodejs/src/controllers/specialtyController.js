import specialtyService from "../services/specialtyService";

let createNewSpecialty = async (req,res) =>{
    try {
        let infor = await specialtyService.createNewSpecialty(req.body);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Lỗi từ phía server"
        })
    }
}
let getAllSpecialty = async (req, res) =>{
    try {
        let infor = await specialtyService.getAllSpecialty();
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Lỗi từ phía server"
        })
    }
}
let getDetailSpecialtyByID = async (req, res) =>{
    try {
        let infor = await specialtyService.getDetailSpecialtyByID(req.query.id, req.query.location);
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
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyByID: getDetailSpecialtyByID,

}