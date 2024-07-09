import bcrypt from 'bcryptjs';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
}

export async function comparePassword(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(enteredPassword, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error.message);
    }
}