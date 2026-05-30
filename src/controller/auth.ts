import { Request, Response } from 'express';
import { User } from "../models";
import { generateToken } from "../utils/jwt";
import { validatePassword, createHash } from "../utils/password";
import { JwtPayload } from '../types/auth.types';
import { IUser } from "../types/user.types";
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const userData = user?.get() as IUser

        const isPasswordValid = await validatePassword(password, userData.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const payload: JwtPayload = { id: userData.id, email: userData.email };
        const token = generateToken(payload);
        return res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }
        const passwordHash = await createHash(password);
        const user = (await User.create({ name, email, password_hash: passwordHash })).get() as IUser;

        const payload: JwtPayload = { id: user.id, email: user.email };
        const token = generateToken(payload);
        return res.status(201).json({ success: true, message: "User created successfully", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}