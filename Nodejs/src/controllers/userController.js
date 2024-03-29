import userService from "../services/userService";

let handleLogin = async(req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    //check email, password exist
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Không tìm thấy dữ liệu!'
        })
    }
    let userData = await userService.handleUserLogin(email,password);

    //compare password
    //return userInfor
    //access_token JWT
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
        // errCode: 0,
        // message: 'hello world',
        // yourEmail: email,
    })
}
let handleGetAllUsers = async(req, res) =>{
    // ?id=... la tham so query tren url
    let id = req.query.id; //all hoặc id (lay tat ca hoạc 1 nguoi dung)
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Khong tim thay nguoi dung',
            users: []
        }) 
    }
    let users = await userService.getAllUsers(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let createHandleCreateNewUser = async(req,res) =>{
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);

}
let handleEditUser = async(req, res) =>{
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}
let handleDeleteUser = async(req, res) =>{
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Khong tim thay nguoi dung"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let getAllCode = async(req,res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log('get allcode: ', error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi phía server'
        })
    }
}
module.exports ={
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    createHandleCreateNewUser: createHandleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser:handleDeleteUser,
    getAllCode: getAllCode,
}