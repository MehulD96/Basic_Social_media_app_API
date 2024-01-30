import express from 'express';
import { loginAdmin,getAllUser, EditUser, UpdateUser, deleteUser } from '../controller/adminController.js';
import { editUser } from '../controller/userController.js';



const adminrouter = express.Router();

/*router.get("/", (req,res)=>{
    res.render('login');
})*/
adminrouter.get("/adminlogin",(req,res)=>{res.render('./Admin/adminlogin')});
adminrouter.get("/admindashboard",getAllUser)
adminrouter.get("/signup", (req,res)=>{res.render('signup')});
adminrouter.get("/adminedit", EditUser);
adminrouter.put("/adminedit", UpdateUser);
adminrouter.delete("/admindelete",deleteUser);
adminrouter.post("/adminlogin", loginAdmin);
//adminrouter.put("/update/:id", updateUser);
//adminrouter.delete("/delete/:id",deleteUser);

export default adminrouter;

