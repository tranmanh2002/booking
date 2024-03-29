import { ExclusionConstraintError } from "sequelize";
import db from "../models/index"
import bcrypt from 'bcryptjs';
// import { all } from "sequelize/types/lib/operators";

const salt = bcrypt.genSaltSync(10);
// hash password
let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) =>{
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e)
        }
    })
}
//check email
let checkUserEmail = (userEmail) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
//Xử lý login
let handleUserLogin = (email, password) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if(isExist){
                //user already exist
                let user = await db.User.findOne({
                    //lay 3 truong du lieu de hien thi
                    attributes: ['email', 'roleID', 'password', 'firstName', 'lastName'],
                    where: {email: email},
                    raw: true,
                    
                });
                //check lai dieu kien user tranh truong hop user bi xoa trong cung 1 thoi diem
                if(user) {
                    //So sanh password voi hashpassword
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        //dung de loai tru password hien thi trong bang, tranh viec password cua nguoi dung bị hack
                        delete user.password;
                        userData.user = user;
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = 'Sai mật khẩu';

                    }
                }else{
                    userData.errCode = 2,
                    userData.errMessage ='Không tìm thấy người dùng'
                }
            }else{
                userData.errCode = 1,
                userData.errMessage = `Email của bạn không tồn tại trong hệ thống!`
            }   
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

//Lay thong tin cua users
let getAllUsers = (userID) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let users = '';
            if(userID === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                })
            }if(userID && userID !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userID},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
//Tao tai khoan user
let createNewUser = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: "Email đã được sử dụng, vui lòng thử với email khác"
                })
            }else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleID: data.roleID,
                    positionID: data.positionID,
                    image: data.avatar,
                })
                resolve({
                    errCode: 0,
                    message: 'Thêm người dùng thành công!'
                })
            }
            
        } catch (error) {
            reject(error)
        }
    })
}
//Xóa người dùng
let deleteUser = (userID) =>{
    return new Promise(async(resolve, reject) =>{
        let user = await db.User.findOne({
            where: {id: userID}
        })
        if(!user){
            resolve({
                errCode: 2,
                errMessage: "Người dùng không tồn tại"
            })
        }
        //xoa nguoi dung truc tiep duoi database
        await db.User.destroy({
            where: {id: userID}
        });
        resolve({
            errCode: 0,
            message: 'Người dùng đã bị xóa'
        });
    })
}
let updateUserData = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.id || !data.roleID || !data.positionID || !data.gender){
                resolve({
                    errCode: 2,
                    errMessage: 'Không tìm thấy người dùng'
                })
            }
            let user = await db.User.findOne({
                raw: false,
                where: {id: data.id},
            })

            //Luu thong tin nguoi dung
            if(user){    
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleID = data.roleID;
                user.positionID = data.positionID;
                user.gender = data.gender;  
                user.phoneNumber = data.phoneNumber;                 
                user.image = data.avatar;

                // console.log('check ảnh: ', user.image)
                await user.save();
                resolve(
                    {
                        errCode: 0,
                        message: "Cập nhật user thành công!"
                    }
                )
                
            }else{
                resolve({
                    errCode: 1,
                    message: 'Người dùng không tìm thấy'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
//Lấy các giá trị trong các thuộc tính của bảng Allcode
let getAllCodeService = (typeInput) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Hết thời gian chờ!'
                });

            }else{
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput}
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);

            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports ={
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData, 
    getAllCodeService: getAllCodeService,

}   