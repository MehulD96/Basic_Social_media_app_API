import jwt from 'jsonwebtoken';
import ResponseMessage from '../utils/ResponseMessage.js';
import { StatusCodes } from "http-status-codes";
import * as dotenv from 'dotenv';
dotenv.config();

export const genrateToken = async ( {payload} ) => {
    console.log("payload",payload);
    const token =await jwt.sign({payload}, process.env.SECRET_KEY, {
        expiresIn: 15*60*60,
  
      });
      console.log("generating token",token);
    return token; 
  };


export const verifyToken = async(req,res,next )=>{
  const token = req.cookies?.login || req.body.token || req.query.token || req.headers["authorization"];
  console.log("token in verification",typeof token);
  if(!token||token===""){

    console.log("login first, you are not logged in!!");
    
  }else{
    
    try{
      const decode = jwt.verify(token.token, "HellothereThisisatestproject123456789012");

    }catch(err){
      console.log(err)

    }
  }
      return next();
}