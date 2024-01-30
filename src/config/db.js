import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected to database.."))
    .catch((err) =>console.log(err));
};
