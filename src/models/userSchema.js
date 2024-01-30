import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please enter the name"],
    },

    email:{
        type:String,
        //required:[true,"Please enter the email"],
        unique:[true,"Email already exist"],
        
    },

    phone:{
        type:Number,
        unique:[true,"Phone no already exist"],
        //required:[true,"Please enter the phone number"],
    },

    password:{
        type:String,
        required:[true,"Please enter the password"],
    },

    image:{
        type:String,
        required:false,
    },

    token:{
        type:String,
    },
    isDeleted:{
        type: Boolean,
        default: false,
        required: false
    },

    isAdmin:{
        type: Boolean,
        default:false,
        required:false
    }

})

export default mongoose.model("User", UserSchema);