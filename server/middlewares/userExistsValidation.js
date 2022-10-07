const Users = require("../models/usersModel");
const bcrypt = require('bcrypt');


const userExistsValidation = async (req,res,next) => {
    const {username} = req.body
    let {password} = req.body
    userExists = await Users.findOne({username})
    if(!userExists){
        password = await bcrypt.hash(password, 10)
        req.user ={
            username,
            password
        }
        next()
    }else{
        res.status(409).json({
            status:"fail",
            messege:"Username already exists"
        })
    }
    
}
module.exports = userExistsValidation