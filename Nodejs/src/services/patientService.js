require('dotenv').config();
import db from "../models/index";

let postBookAppointment = (data) => {
    return new Promise(async( resolve, reject) =>{
        try {
            if(!data.email || !data.doctorID || !data.timeType || !data.date){
                resolve({
                    errCode: 1,
                    errMessage: "Hết thời gian chờ"
                })
            }else{
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    default: {
                        email: data.email,
                        roleID: 'R3'
                    }
                });
                console.log('check user: ', user[0])
                //tạo bản ghi lịch khám
                if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where: {patientID: user[0].id},
                        default: {
                            statusID: 'S1',
                            doctorID: data.doctorID,
                            patientID: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                resolve({
                    data: user,
                    errCode: 0,
                    errMessage: "Tạo lịch khám thành công"
                })
            }
           
        } catch (error) {
           reject(error)
        }
    })
}
module.exports = {
    postBookAppointment: postBookAppointment,

}