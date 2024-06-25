import User from '../models/user.model.js';
// import bcrypt from 'bcryptjs';
 
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

export {signup}
