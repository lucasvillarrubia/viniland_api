import { NextFunction, Request, Response  } from "express";

export const verifiedCheck = (req: Request, res: Response, next: NextFunction): void => {
        const { verified } = req.body.confirmedUser;
        if (!verified) {
                res.status(401).json({ msg: "El usuario no está verificado" });
                return;
        }
        next();
}