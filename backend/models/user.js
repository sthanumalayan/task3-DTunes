import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    username:String,
    password:String,
    loggedIn:Boolean
})

export const user=mongoose.model('users',userSchema);