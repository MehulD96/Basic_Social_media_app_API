import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcrypt';
import ejs from 'ejs';
import { StatusCodes } from "http-status-codes";
import Admin from '../models/adminSchema.js';
import User from '../models/userSchema.js';
import ResponseMessage from '../utils/ResponseMessage.js';


export const getAllUser = async(req,res) =>{
    let users;

    try{
        users = await User.find({isDeleted:false})
        if(users){
            
            console.log(users);
            console.log("users found");
            //return res.render("./Admin/adminDashboard",{users:users})
             res.render('./Admin/adminDashboard',{users:users});/*status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.USER_FETCHED,
                data: {users}
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


export const loginAdmin = async(req,res)=>{
    const {email, password} = req.body;

    if(email==='innovationpvtltd@gmail.com'){
        if(password==='node@123'){
            res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.USER_LOGGED_IN,
                
             }).render('admindashboard');
        }else{
            res.status(401).json({
                status: StatusCodes.UNAUTHORIZED,
                message: ResponseMessage.INVALID_PASSWORD,
             });
        }
    }else{
        return res.status(400).json({
            status: StatusCodes.BAD_REQUEST,
            message: ResponseMessage.USER_NOT_FOUND,
            data: [],
        });
    }
    /*let correctEmail;
    try{
        correctEmail = await Admin.findOne({email})
        if(correctEmail){
            const passwd = await bcrypt.compareSync(password, correctEmail.password);
            if(passwd){

            console.log("credentials Matched");
            res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.USER_LOGGED_IN,
                data: { correctEmail }
             });
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
        return res.status(500).json({
           status: StatusCodes.INTERNAL_SERVER_ERROR,
           message: ResponseMessage.INTERNAL_SERVER_ERROR,
           data: [],
        });
    }*/
}


export const deleteUser = async(req,res) =>{
    try {
        const id = req.query.id;
        const userDelete = await User.findOneAndUpdate(
          { _id: id },
          { $set: { isDeleted: true } },
          { new: true }
        );
        if (userDelete) {
          return res.redirect("/admindashboard")/*res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.SUB_ADMIN_DELETED,
            data: [],
          });*/
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



export const EditUser = async(req,res,next) => {
    console.log("in edit user API");
    const id = req.query.id;
    try{
        const findUser = await User.findById({_id:id});
        
        if (findUser){
            res.render('./Admin/adminedit',{user:findUser});
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

export const UpdateUser = async(req,res) => {
    console.log("in update user API");
    const id = req.query.id;
    const name = req.body.name;
    const email = req.body.email
    
    console.log("id and name",id,name)
    try{

        const findUser = await User.findByIdAndUpdate({_id:id},{$set:{name:name, email:email}});
        console.log("finally user details",findUser);
        if (findUser){
            res.redirect('admindashboard');

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