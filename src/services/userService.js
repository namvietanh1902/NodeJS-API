import bcrypt from 'bcryptjs'
import e from 'express';
import db from '../models/index'

let createNewUser = (data) =>{
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
            resolve({
                errCode: 0,
                errMessage: "OK"
            });
        }
        catch(err){
            reject(err);
        }
})}
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
let handleUserLogin = (email, password) =>{
    return (new Promise(async (resolve, reject) =>{
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist){
                
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['email','password','roleID']
                })
                if (user){

                    let check = bcrypt.compareSync(password,user.password);
                    if (check){
                        userData.errCode = 0;
                        userData.message ="Tài khoản tồn tại"
                        userData.data ={
                            email:user.email,
                            role: user.roleID
                        };
                    }
                    else{
                        userData.errCode = 3;
                        userData.message ="Mật khẩu sai"
                        
                        
                    }
                }
                else{
                    userData.errCode = 2;
                    userData.message ="Tài khoản không tồn tại"
                }
                
            }
            else{
                userData.errCode =1;
                userData.message = "Your email does not exist";
            }
            resolve(userData);
        }
        catch(err){
            reject(err);
        }
    }))
}
let handleGetAllUsers = async (id) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let data ={}
            if (id.toLowerCase() =='all'){
                data = await db.User.findAll({
                    raw: true
                });
            }
            else{
                let user = await db.User.findOne({
                    raw: true,
                    where: {id: id}
                })
                if (user) {
                    data = user;
                }
                else{
                    data ={message: "Người dùng không tồn tại"}
                }
            }
            resolve(data);
        }   
        catch(err){
            reject(err);
        }
    })

}
let checkUserEmail = (email) =>{
    try{
        return new Promise(async (resolve, reject) =>{
            
            let user = await db.User.findOne({
                raw: true,
                where: {email: email}
            })
            if (user){
                resolve(true);
            }
            else{
                resolve(false);
            }
        })
    }
    catch(err){
                reject(err);
    }
}
module.exports ={
    handleUserLogin: handleUserLogin,
    handleGetAllUsers: handleGetAllUsers,
    createNewUser: createNewUser
}