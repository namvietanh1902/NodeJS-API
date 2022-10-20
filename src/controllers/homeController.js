import db from '../models/index';
import CRUDService from '../services/CRUDService'
let getHomePage = async (req, res) => {
    try {

        let data = await db.Allcode.findAll();
        
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    }
    catch (err) {
        console.log(err);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.redirect('back')
}
let displayGetCRUD = async (req, res) => {    
    let data = await CRUDService.getAllUsers();
    return res.render('../views/displayCRUD.ejs',
    {
        data
    });
}
let getEditCRUD = async (req, res) => {
    let UserId = req.query.id;
    let userData = await CRUDService.getUserById(UserId);
    console.log(userData);
    return res.render('../views/editCRUD.ejs',{
        data: userData
    });
}
let editCRUD = async (req, res) => {
    let message = await CRUDService.updateUser(req.body,req.params.id);
    console.log(message);
    return res.redirect('/get-crud');
}
let deleteCRUD = async (req, res) =>{
    let message = await CRUDService.deleteUser(req.params.id);
    console.log(message);
    return res.redirect('/get-crud');
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
    editCRUD: editCRUD,
    deleteCRUD: deleteCRUD,
}
