import bcrypt from 'bcrypt';

export const validatePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}
export const createHash = async (password: string) => {
    return await bcrypt.hash(password, 10);
}
