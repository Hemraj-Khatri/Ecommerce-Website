import express from 'express';
import cookieParser from 'cookie-parser';
//routers imports
import userRouter from './routes/user.router.js';

//initialize express app
const app = express();
//middlewares
app.use(express.json())
app.use(cookieParser());

//routes
app.use('/api/v1/users', userRouter);


export {app};