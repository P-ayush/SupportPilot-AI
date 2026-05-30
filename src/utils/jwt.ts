import jwt from 'jsonwebtoken';

export const generateToken = ({ id, email }: { id: number, email: string }) => jwt.sign({ id, email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

export const verifyToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET as string);