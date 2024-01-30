import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import { StatusCodes } from "http-status-codes";
import User from '../models/userSchema.js';
import ResponseMessage from '../utils/ResponseMessage.js';
import {genrateToken, verifyToken} from '../services/commonServices.js'

//import router from './src/routes/userRoutes.js';

export const signup = async(req,res) =>{
    console.log("req.body",req.body);
        const name = req.body.Uname;
       const email = req.body.Email;
        const phone= req.body.Phone;
        const password = req.body.Pass; 
    
    const image = req.file.filename;
    console.log("imgae",image);
    if(name ==="" || password==="" || email==="" && phone===""){
        
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.FIELDS_NOT_FOUND,
            data: [],
         });
    }
    try{
        
        let user = await User.find({$or:[{email},{phone}]});
        console.log("user",user);
    

        if(user.length===0){
        const hashedPasswd = bcrypt.hashSync(password,10);
        console.log(hashedPasswd);
            user = new User({
                name, email, phone, password: hashedPasswd, image
            });

           
            try{
                let save = await user.save();
                /*const token = createToken(user._id);
                res.cookie('jwt', token,{httpOnly})*/
                
                return res.status(200).json({
                    status: StatusCodes.CREATED,
                    message: ResponseMessage.USER_CREATED,
                    data: {user}
                });
            }
                catch(err){
                    if (err.name === "ValidationError") {
                        let errors = {};
                
                        Object.keys(err.errors).forEach((key) => {
                        errors[key] = err.errors[key].message;
                        });
                    console.log(err)
                
                    return res.status(401).json({
                        status: StatusCodes.UNAUTHORIZED,
                        message: ResponseMessage.USER_UNAUTHORISED,
                        data: {user}
                    });
                    }else{
                        console.log("validation error");
                        return res.status(500).json({
                            status: StatusCodes.INTERNAL_SERVER_ERROR,
                            message: ResponseMessage.INTERNAL_SERVER_ERROR,
                            data: [err.message],
                        });
                    }
                }

            
        }else{
            return res.status(409).json({
                status: StatusCodes.CONFLICT,
                message: ResponseMessage.USER_ALREADY_CREATED,
                data: [],
            });
        }
    }catch(err){
        
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: [err.message],
        });
    }
}



export const getUser = async(req,res) =>{
    console.log("in getuser API",req.cookies.login);
    if (typeof req.cookies.login=== "undefined"){
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.FIELDS_NOT_FOUND,
            data: [],
         });
    }
    const {email,phone} = req.cookies.login
    let user;
    if(email==="" && phone===""){
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.FIELDS_NOT_FOUND,
            data: [],
         });
    }
    if (phone !=="" || email!==""){
        try{
            user = await User.findOne({$and:[{$or:[{email},{phone}]},{isDeleted:false}]})
        if(user){
            
            console.log(user);
            console.log("users found");
            res.render("userDashboard",{users:user})/*status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.USER_FETCHED,
                data: {user}
             });*/
        }else{
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_NOT_FOUND,
                data: [],
             });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: [err.message],
         });
    }
}
}


export const loginUser = async(req,res)=>{
    const {email, phone, password} = req.body;

    let correctEmail;
    if(password==="" || email==="" && phone===""){
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.FIELDS_NOT_FOUND,
            data: [],
         });
    }
    if (phone !=="" || email!==""){
        try{
            correctEmail = await User.findOne({$and:[{$or:[{email},{phone}]},{isDeleted:false}]});
            console.log("useID",correctEmail.id);
            if(correctEmail){
                const passwd = await bcrypt.compareSync(password, correctEmail.password);
                if(passwd){

                    const tokendata = await genrateToken(correctEmail.id);

                    const matchResult = {
                        _id:correctEmail._id,
                        name:correctEmail.name,
                        email:correctEmail.email,
                        password:correctEmail.password,
                        //image:correctEmail.image,
                        phone:correctEmail.phone,
                        token:tokendata

                    };
                    res.cookie("login",matchResult,54000)
                
                return res.status(200).json({
                    status: StatusCodes.OK,
                    message: ResponseMessage.USER_LOGGED_IN,
                    data: { correctEmail }
                })
                
                }else {
                    res.status(401).json({
                    status: StatusCodes.UNAUTHORIZED,
                    message: ResponseMessage.INVALID_PASSWORD,
                    });
                }
            }else{
                console.log(" Please enter correct details");
                return res.status(400).json({
                    status: StatusCodes.BAD_REQUEST,
                    message: ResponseMessage.USER_NOT_FOUND,
                    data: [],
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_NOT_FOUND,
                data: [],
            });
        }
    }
}


export const deleteUser = async(req,res) =>{
    try {
        const userDelete = await User1.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { isDeleted: true } },
          { new: true }
        );
        if (userDelete) {
          return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.SUB_ADMIN_DELETED,
            data: [],
          });
        } else {
          return res.status(400).json({
            status: StatusCodes.BAD_REQUEST,
            message: ResponseMessage.SUB_ADMIN_NOT_DELETED,
            data: [],
          });
        }
      } catch (err) {
        return res.status(500).json({
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: ResponseMessage.INTERNAL_SERVER_ERROR,
          data: [err.message],
        });
      }
}


export const editUser = async(req,res,next) => {
    console.log("in edit user API");
    const id = req.query.id;
    try{
        const findUser = await User.findById({_id:id});
        
        if (findUser){
            res.render('useredit',{user:findUser});
        }else {
            return res.status(400).json({
              status: StatusCodes.BAD_REQUEST,
              message: ResponseMessage.ADMIN_NOT_FOUND,
            });
          }
    }catch(err){
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: [err.message],
          });
    }
    return next();
}



export const updateUser = async(req,res) => {
    console.log("in update user API");
    const id = req.query.id;
    const name = req.body.name;
    
    console.log("id and name",id,name)
    try{
        /*if(req.file){
            const file = await User.findByIdAndUpdate({_id:id}, {$set:{ image}}, {new:true});
        }*/
        const findUser = await User.findByIdAndUpdate({_id:id},{$set:{name:name}});
        console.log("finally user details",findUser);
        if (findUser){
            res.redirect('userdashboard');
            /*return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.SUB_ADMIN_DELETED,
                data: [findUser],
              });*/
        }else {
            return res.status(400).json({
              status: StatusCodes.BAD_REQUEST,
              message: ResponseMessage.ADMIN_NOT_FOUND,
            });
          }
    }catch(err){
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: [err.message],
          });
    }
}