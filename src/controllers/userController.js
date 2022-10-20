import userService from '../services/userService'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            message: 'Missing input parameters',
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        userData: userData,
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.params.id;
    let data = await userService.handleGetAllUsers(id)
    
    console.log(data);
    return res.json(data);
}
let handleCreateUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin : handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser
}