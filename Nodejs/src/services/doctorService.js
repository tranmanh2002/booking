import db from '../models/index';
require('dotenv').config();
import _, { reject } from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

//Lấy top bác sĩ
let getTopDoctorHome = (limitInput) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {roleID: 'R2'},
                //lay theo thu tu thoi gian duoc tao
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {model: db.Allcode, as: 'positionData', attributes: ['valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueVi']}

                ],
                //hiển thị dữ liệu dưới dạng đối tượng lồng nhau
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
            // console.log("check data user: ", data)

        } catch (error) {
            reject(error);
        }
    })
}
//Lấy tất cả bác sĩ
let getAllDoctors = () =>{
    return new Promise(async(resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {roleID: 'R2'},
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errCode: 0,
                data: doctors,
            })
        } catch (error) {
            reject(e)
        }
    })
}
//check điều kiện valid
let checkRequiredFields = (inputData) =>{
    let arrFields = ['doctorID', 'contentHTML', 'contentMarkdown', 'action', 'selectedPrice', 
    'selectedPayment', 'selectedProvince', 'nameClinic','addressClinic', 'note', 'specialtyID']

    let isValid = true;
    let element = '';
    for(let i = 0; i < arrFields.length; i++){
        if(!inputData[arrFields[i]]){
            isValid = false;
            element = arrFields[i]
            break;
        }
    }
    return{
        isValid: isValid,
        element: element
    }
}
//lưu thông tin bác sĩ
let saveDetailInforDoctor = (inputData) =>{
    return new Promise(async(resolve, reject) => {
        try {
            //check điều kiện valid
            let checkObj = checkRequiredFields(inputData);
            if(checkObj.isValid === false){
                resolve({
                    errCode: 1,
                    errMessage: `Lưu thông tin bác sĩ thất bại: ${checkObj.element}`
                })
            }else{
                //upsert to markdown
               if(inputData.action === 'CREATE'){
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorID: inputData.doctorID,
                    })  
               }else if (inputData.action === 'EDIT'){
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: {doctorID: inputData.doctorID},
                        raw: false
                    })  
                    if(doctorMarkdown){
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown,
                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.updateAt = new Date();
                        await doctorMarkdown.save()
                    }
               }
               //upsert to Doctor_infor table
               let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {doctorID: inputData.doctorID},
                    raw: false  
               })
               if(doctorInfor){
                    doctorInfor.doctorID = inputData.doctorID;
                    doctorInfor.priceID = inputData.selectedPrice;
                    doctorInfor.paymentID = inputData.selectedPayment;
                    doctorInfor.provinceID = inputData.selectedProvince;
                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.note = inputData.note;
                    doctorInfor.specialtyID = inputData.specialtyID;
                    doctorInfor.clinicID = inputData.clinicID;

                    await doctorInfor.save()
               }else{
                    await db.Doctor_Infor.create({
                        doctorID: inputData.doctorID,
                        priceID: inputData.selectedPrice,
                        paymentID: inputData.selectedPayment,
                        provinceID: inputData.selectedProvince,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                        specialtyID: inputData.specialtyID,
                        clinicID: inputData.clinicID,

                    })
               }
               resolve({
                    errCode: 0,
                    errMessage: 'Lưu thông tin bác sĩ thành công'
               })
                
            }
        } catch (error) {
            reject(error)
        }
    })
}
//lấy thông tin bác sĩ
let getDetailDoctor = (inputID) =>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!inputID){
                resolve({
                    errCode: 1,
                    errMessage: 'Lỗi từ phía server'
                })
            }else{
                let data = await db.User.findOne({
                    //tìm user với điều kiện where
                    where: {id: inputID},
                    //loai trừ 2 thuộc tính password và image
                    attributes: {
                        exclude: ['password']
                    },
                    
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {model: db.Allcode, as: 'positionData', attributes: ['valueVi'] },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorID']
                            },
                            include: [
                                {model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi']},
                                {model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi']},
                                {model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi']},
                            ]
                        },
                    ],
                    raw: false,
                    nest: true,
                })
                if(data&& data.image){
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }
                if(!data){ 
                    data = {};
                };
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
//tạo thông tin lịch khám bệnh cho bác sĩ
let bulkCreateSchedule = (data) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            // console.log("check data: ", data)
            if(!data.arrSchedule || !data.doctorID || !data.formatedDate){
                resolve({
                    errCode: 1,
                    errMessage: 'Yêu cầu hết hạn!'
                })
            }else{
                let schedule = data.arrSchedule;
                if(schedule && schedule.length > 0){
                    schedule = schedule.map(item =>{
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                //lấy tất cả bản ghi trong db
                let existing = await db.Schedule.findAll({
                    where: {doctorID: data.doctorID, date: data.formatedDate},
                    attributes: ['timeType', 'date', 'doctorID', 'maxNumber'],
                    raw: true
                });
                 //so sánh sự khác nhau, chèn khi có sự khác biệt giữa data
                let toCreate = _.differenceWith(schedule, existing, (a, b) =>{
                    return a.timeType === b.timeType && +a.date === +b.date;
                });
                 //tạo data
                if(toCreate && toCreate.length > 0){
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo lịch hẹn khám bệnh thành công!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
//Lấy lịch hẹn theo ngày
let getScheduleByDate = (doctorID, date) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!doctorID || !date){
                resolve({
                    errCode: 1,
                    errMessage: 'Yêu cầu hết hạn'
                })
            }else{
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorID: doctorID,
                        date: date
                    },
                    include: [
                        {model: db.Allcode, as: 'timeTypeData',attributes: ['valueVi']},
                    ],
                    raw: false,
                    nest: true
                })
                if(!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
//lấy dữ liệu thông tin từ doctor 
let getExtraInforDoctorByID = (idInput) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!idInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Yêu cầu hết hạn'
                })
            }else{
                let data = await db.Doctor_Infor.findOne({
                    where: {
                        doctorID: idInput
                    },
                    attributes: {
                        exclude: ['id', 'doctorID']
                    },
                    include: [
                        {model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi']},
                        {model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi']},
                        {model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi']},

                    ],
                    raw: false,
                    nest: true
                })
                if(!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
//Lấy thông tin profile
let getProfileDoctorByID = (idInput) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!idInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Yêu cầu hết hạn'
                })
            }else{
                let data = await db.User.findOne({
                    where: {
                        id: idInput
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {model: db.Markdown,
                             attributes: ['description', 'contentHTML', 'contentMarkdown']},
                        {model: db.Allcode, as: 'positionData', attributes: ['valueVi']},
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorID']
                            },
                        include: [
                                {model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi']},
                                {model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi']},
                                {model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi']},
                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                if(data && data.image){
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if(!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorByID: getExtraInforDoctorByID,
    getProfileDoctorByID: getProfileDoctorByID,
    checkRequiredFields: checkRequiredFields,

}