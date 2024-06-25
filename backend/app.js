import express from 'express';
//routers imports
import userRouter from './routes/user.router.js';

//initialize express app
const app = express();
//middlewares
app.use(express.json())

//routes
app.use('/api/v1/users', userRouter);


export {app};