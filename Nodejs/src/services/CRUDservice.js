import bcrypt from 'bcryptjs';
import db from '../models/index';




const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) =>{
    return new Promise(async(resolve,reject) =>{
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleID: data.roleID,
            })
            resolve('create new user succeed')
        }catch(e){
            reject(e);
        }
    })
    // console.log('Data from service')
    // console.log(data)
    // console.log(hashPasswordFromBcrypt)
}

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
//ham lay tat ca user
let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            //resolve dung de thoat khoi promise
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
//tra ve thong tin của user
let getUserInfoByID = (userID) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                
                where: {id: userID},
                raw: true,
            })
            if(user){
                resolve(user)
            }else{
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })
}
//thay doi thong tin cua user
let updateUserData = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            //lay du lieu cua user thong qua id
            let user = await db.User.findOne({
                raw: false,
                where: {id: data.id}
            })
            //check dieu kien thong tin user moi va luu
            if(user){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,

                await user.save();
                //tra ve danh sach user ban dau
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
    // console.log('data from service')
    // console.log(data)
}
let deleteUserByID = (id) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.User;
            await user.destroy({
                where: {id: id}
            });
            let allUsers = await db.User.findAll();

            resolve(allUsers);
            // if(user){
                
            //     await user.destroy();
            //     resolve();
            // }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports ={
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoByID: getUserInfoByID,
    updateUserData: updateUserData,
    deleteUserByID: deleteUserByID,
}