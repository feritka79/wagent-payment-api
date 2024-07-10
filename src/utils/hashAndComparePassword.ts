import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePassword(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    const isValid = bcrypt.compare(enteredPassword, hashedPassword);
    return isValid
}