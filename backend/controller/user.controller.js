import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/token.utils.js';
import asynHandler from '../middleware/asynchandler.middleware.js';
 import ApiError from '../utils/apiError.js';
const signup = asynHandler(async(req, res, next)=>{

    let{name, email, password, isAdmin} = req.body;
    let userexits = await User.findOne({email:email});
    if(userexits){
        throw new ApiError(400,`User with email ${email} already exists!` )
        }
    
        let newuser = await User.create({
        name, 
        email, 
        password,
        isAdmin, 
    }
    );
    // let {registerName, registerEmail, registeredIsAdmin} = registeruser
    createToken(res, newuser._id);
    res.send({
        message:"User registered sucessfully",
        user:{
            name:newuser.name,
            email:newuser.email, 
            isAdmin: newuser.isAdmin,

        }
    });
});


const login = asynHandler(async (req, res, next) =>{
   
        const {email, password} =req.body;
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            throw new ApiError(400, "user with this email does not exist")
            }
        // compare password
        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch){
            let err = new Error("Invalid Password!");
            err.status = 400;
            throw err;
        }
       createToken(res, user._id);
        res.send({message: "login successfully"});

    }); 
const logout = asynHandler((req, res)=>{
    res.clearCookie("jwt");
    res.send({message: "logout Successfully"})
}
);

const getUsers = asynHandler(async(req, res) =>{
    let users = await User.find({}).select('-password');
    res.send(users)
});

export {signup, login, logout, getUsers}
