import db from '../models/index';
import CRUDservice from '../services/CRUDservice';

let getHomePage = async(req, res) => {
    try{
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e)
    }
    
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('test/crud.ejs');
}
let postCRUD = async(req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message)
    // await CRUDservice.createNewUser(req.body);
    // console.log(req.body);

    return res.send('create new user succeed');
}

let displayGetCRUD = async(req, res) =>{
    let data = await CRUDservice.getAllUser();
    // console.log('--------------')
    // console.log(data)
    // console.log('--------------')

    return res.render('test/displayCRUD.ejs', {
        //khai bao bien dataTable lay du lieu tu data
        dataTable: data
    })
}
//dieu huong sang view edit user
let getEditCRUD = async (req, res) =>{
    let userID = req.query.id;
    console.log(userID)
    if(userID){
        let userData = await CRUDservice.getUserInfoByID(userID);

        // console.log('--------------')
        // console.log(userData)
        // console.log('--------------')

        return res.render ('test/editCRUD.ejs', {
            user: userData
        })

    }else{
        return res.send('User not found!')
    }
}

let putCRUD = async(req,res) =>{
    let data = req.body;
    //doi thay doi tu crud va dua ra ket qua
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render ('test/displayCRUD.ejs', {
        dataTable: allUsers
    })
}
let deleteCRUD = async(req, res)=>{
    let id = req.query.id;
    if(id){
        let allUsers = await CRUDservice.deleteUserByID(id);
        return res.render ('test/displayCRUD.ejs', {
            dataTable: allUsers
        })
    }else{
        return res.send('User not found')

    }
    // console.log(id)
}
// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
