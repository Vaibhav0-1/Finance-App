import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,

})

const User = model('User', )