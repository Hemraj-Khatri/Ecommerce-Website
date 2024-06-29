import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/token.utils.js';
 
const signup = async(req, res, next)=>{
try {
    let{name, email, password, isAdmin} = req.body;
    let userexits = await User.findOne({email:email});
    if(userexits){
        let err = new Error(`User with email ${email} already exists!`);
        err.status = 400;
        throw err;
    }
    
        let newuser = await User.create({
        name, 
        email, 
        password,
        isAdmin, 
    }
    );
    // let {registerName, registerEmail, registeredIsAdmin} = registeruser

    res.send({
        message:"User registered sucessfully",
        user:{
            name:newuser.name,
            email:newuser.email, 
            isAdmin: newuser.isAdmin,

        }
    });
} catch (err) {
    next(err)
}
};


const login = async (req, res, next) =>{
    try {

        const {email, password} =req.body;
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            let err = new Error("user with this email does not exist");
            err.status = 400;
            throw err;
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

    } catch (error) {
        next(error)
    }
};
const logout = (req, res)=>{
    res.clearCookie("jwt");
    res.send({message: "logout Successfully"})
}


export {signup, login, logout}
