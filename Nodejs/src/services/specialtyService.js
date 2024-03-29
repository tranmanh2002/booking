const db = require("../models")
// import db from '../models/index';
// require('dotenv').config();

let createNewSpecialty = (data) =>{
    return new Promise (async( resolve, reject) =>{
        try {
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: "lỗi"
                })
            }else{
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,

                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (error) {
            
        }
    })
}
let getAllSpecialty = () =>{
    return new Promise (async( resolve, reject) =>{
        try {
           let data = await db.Specialty.findAll({

           });
           if(data && data.length > 0){
                if(data && data.image){
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                // data.map(item =>{
                //     item.image = new Buffer(item.image, 'base64').toString('binary');
                //     return item;
                // })
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
let getDetailSpecialtyByID = (inputID, location) =>{
    return new Promise (async( resolve, reject) =>{
        try {
           if(!inputID || !location){
                resolve({
                    errCode: 1,
                    errMessage: 'Có lỗi xảy ra',
                    data
                })
           }else{
            let data = await db.Specialty.findOne({
                where: {
                    id: inputID
                },
                attributes: ['descriptionHTML', 'descriptionMarkdown'],
            })
            if(data){
                let doctorSpecialty = [];
                //lấy theo location
                if(location === 'ALL'){
                    doctorSpecialty = await db.Doctor_Infor.findAll({
                        where: {specialtyID: inputID},
                        attributes: ['doctorID', 'provinceID'],
                    })
                }else{
                    doctorSpecialty = await db.Doctor_Infor.findAll({
                        where: {
                            specialtyID: inputID,
                            provinceID: location
                        },
                        attributes: ['doctorID', 'provinceID'],
                    })
                }
                data.doctorSpecialty = doctorSpecialty;
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
module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyByID: getDetailSpecialtyByID,

}