import { Document, Schema, model } from 'mongoose';
import { hashPassword, comparePassword } from '../utils/passwordHash';

export interface IUser extends Document {
    email: string;
    password: string;
    storeName: string;
    storeImage: string;
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
    storeImage: {
        type: String,
        required: true,
    },
}, { timestamps: true });

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await comparePassword(enteredPassword, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;