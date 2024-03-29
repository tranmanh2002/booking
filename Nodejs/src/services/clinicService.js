const db = require("../models");
const { getDetailSpecialtyByID } = require("./specialtyService");

let createClinic = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.name || !data.address
                || !data.imageBase64 || !data.descriptionHTML
                || !data.descriptionMarkdown){
                    resolve({
                        errCode: 1,
                        errMessage: 'Lỗi'
                    })
            }else{
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,

                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllClinic = () =>{
    return new Promise (async (resolve, reject) =>{
        try {
            let data = await db.Clinic.findAll({
            });
            if(data && data.length > 0){
                if(data && data.image){
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                } 
           }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailClinicByID = (inputID) =>{
    return new Promise (async( resolve, reject) =>{
        try {
           if(!inputID){
                resolve({
                    errCode: 1,
                    errMessage: 'Có lỗi xảy ra',
                    data
                })
           }else{
            let data = await db.Clinic.findOne({
                where: {
                    id: inputID
                },
                attributes: ['name', 'address','descriptionHTML', 'descriptionMarkdown'],
            })
            if(data){
                let doctorClinic = [];
                doctorClinic = await db.Doctor_Infor.findAll({
                    where: {clinicID: inputID},
                    attributes: ['doctorID', 'provinceID'],
                })
                data.doctorClinic = doctorClinic;
                // console.log("check data: ", data)
            }else data = {}
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })
           }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports ={
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicByID: getDetailClinicByID,
}