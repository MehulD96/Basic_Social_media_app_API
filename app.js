import express from  'express';
import bodyParser from 'body-parser';
import {dbConnection} from './src/config/db.js';
import router from './src/routes/userRoutes.js';
import adminrouter from './src/routes/adminRoutes.js'
import limiter from './src/services/ratelimit.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import * as dotenv from "dotenv";

dotenv.config()
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(limiter);
app.use("/",router,adminrouter);
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.resolve("./src/views"));
app.set("view engine","ejs");


dbConnection();
 //export default {upload:upload};


app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`);
});