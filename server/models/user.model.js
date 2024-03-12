import mongoose from "mongoose";
import defimage from "../assets/defaultprofile.jpg"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,   
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: {defimage},
    },
},{timestamps: true});


const User = mongoose.model("User", userSchema);

export default User;