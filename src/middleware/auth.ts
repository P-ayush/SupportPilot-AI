import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { JwtPayload } from "../types/auth.types";
import { IUser } from "../types/user.types";
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        const user = await User.findByPk(decoded.id)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const userData = user?.get() as IUser
        req.user = {
            id: userData.id,
            email: userData.email
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })

    }
}
export default authMiddleware