import bcrypt from 'bcryptjs'
import db from '../models/index'
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassword = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPassword,
                address: data.address,
                gender: data.gender === '1'? true: false,
                phoneNumber: data.phoneNumber,
                roleID: data.roleID,
                
            })
            resolve("Created successfully");
        }
        catch(err){
            reject(err);
        }
    })
}
let getAllUsers = async() =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let data = await db.User.findAll({
                raw: true,
            });
            
            resolve(data);
        }
        catch(err){
            reject(err);
        }
    })
}
let getUserById = async(id) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let data = await db.User.findOne({
                where: {id: id},
                raw: true
            },)
            
            
            resolve(data);
        }
        catch(err){
            reject(err);
        }
    })
}
let updateUser = async(data,id) => {
    return new Promise(async (resolve, reject) =>{
        try{
            await db.User.update({
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1'? true: false,
                phoneNumber: data.phoneNumber,
                roleID: data.roleID,
            },
            {
                where: {id: id},
                
            })
            console.log(id);
            
            
            resolve("Edit successfully");
        }
        catch(err){
            reject(err);
        }
    })
}
let deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {

        try{
            await db.User.destroy(
                {
                    where: {id: id}
                    
                }
            )
            console.log(id);
            
            
            resolve("Delete successfully");
        }
        catch(err){
            reject(err);
        }
    })
}
const salt = bcrypt.genSaltSync(10);
let hashUserPassword =  (password)=>{
    return new Promise(async (resolve, reject) => {
        try{

            let hash = await bcrypt.hashSync(password,salt);
            resolve(hash);
        }
        catch(err){
            reject(err);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    
}