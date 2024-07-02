import users from './data/users.js';
import products from './data/products.js';
import User from './models/user.model.js';
import Product from './models/product.model.js';
import connectDB from './config/db.js';

process.loadEnvFile();
connectDB();

//import user Details in user collection
async function importData(){
    let newusers = await User.insertMany(users);
    process.exit();
}

async function deleteAllUser(){
    let users = await User.deleteMany({});
    process.exit();
    
}


//  importData();
 deleteAllUser();