import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// this will help in the frontend to have all the correct fileds also helps in model methods generic type
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstname: string;
    lastName: string
};

const userScema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

// Bycrpt middleware fucntion to hash password for mongodb
userScema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
});

const User = mongoose.model<UserType>("User", userScema);

export default User;