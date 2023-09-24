import { NextFunction, Request, Response  } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";

const validateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.headers["x-token"] as string;
        if (!token) {
                res.status(401).json({ msg: "No se recibió un token" });
                return;
        }
        try {
                const secretKey = process.env.SECRET_JWT_KEY as string;
                const payload = jwt.verify(token, secretKey) as JwtPayload;
                const confirmedUser: IUser | null = await User.findById(payload.id);
                if (!confirmedUser) {
                        res.status(401).json({ msg: "Token inválido" });
                        return;
                }
                req.body.confirmedUser = confirmedUser;
                next();
        } catch (error) {
                console.log(error);
                res.status(401).json({ msg: "Token inválido" });
        }
}

export default validateJWT