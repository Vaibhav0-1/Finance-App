import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/");

const userSchema = new Schema({
    FirstName: String,
    LastName
    password: String,

})

const User = model('User', userSchema);
export default User;
