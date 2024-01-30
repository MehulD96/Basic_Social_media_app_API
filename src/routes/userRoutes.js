import express from 'express';
import { signup, getUser, loginUser, deleteUser, editUser, updateUser } from '../controller/userController.js';
import { verifyToken } from '../services/commonServices.js';
import Uploads from '../middleware/ImageUpload.js'

const router = express.Router();
router.use(express.static("public"))

/*router.get("/", (req,res)=>{
    res.render('login');
})*/
router.get("/login",(req,res)=>{res.render('login')});
router.get("/signup", (req,res)=>{res.render('signup')});
router.get("/userdashboard",verifyToken,getUser);
router.get("/update", verifyToken, editUser);
router.post("/signup", Uploads,signup);
router.post("/login", loginUser);
router.post("/update", verifyToken,updateUser);
router.delete("/delete/:id",verifyToken,deleteUser);

export default router;

