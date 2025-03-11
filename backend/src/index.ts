import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routes/users'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cors server middleware //because of diffrent port on server or intirely differnt server
app.use(cors());


app.use('/api/users', userRouter);


app.listen(7000, ()=>{
    console.log("Server running on port 7000");
})