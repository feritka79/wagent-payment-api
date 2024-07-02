import mongoose, { Document, Schema, Model } from 'mongoose';
const bcrypt = require('bcryptjs');

export interface IUser extends Document {
    email: string;
    password: string;
    storeName: string;
    confirmPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    storeName: {
        type: String,
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
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
