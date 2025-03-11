import mongoose from 'mongoose';

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstname: string;
    lastName: string
}


const userScema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const User = mongoose.model<UserType>("User", userScema);

export default User;