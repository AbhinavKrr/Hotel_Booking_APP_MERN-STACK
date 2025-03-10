import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cors server middleware //because of diffrent port on server or intirely differnt server
app.use(cors());


app.get('/api/test', async (req: Request, res: Response)=>{
    res.status(200).json({msg:"hii from server"});
})


app.listen(7000, ()=>{
    console.log("Server running on port 7000");
})