import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
import { ROLES } from "../utils/constants";
import { sendVerificationEmail, sendConfirmationEmail } from "../services/mailer";
import generateJWT from "../utils/generateJWT";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password }: IUser = req.body;
        const user = new User({ name, email, password });
        const salt = bcryptjs.genSaltSync();
        const adminKey = req.headers['admin-key'];
        const verificationCode = randomstring.generate(6);

        user.password = bcryptjs.hashSync(password, salt);
        user.code = verificationCode;
        if (adminKey === process.env.ADMIN_KEY) { user.role = ROLES.admin }

        await user.save();
        await sendVerificationEmail(email, verificationCode);
        res.status(201).json({ user });
}

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
        const { email, code } = req.body;
        try {
                const user = await User.findOne({ email });
                if (!user) {
                        res.status(400).json({ msg: "No se encontró este usuario en la base de datos." });
                        return;
                }
                if (user.verified) {
                        res.status(400).json({ msg: "El usuario ya está verificado." });
                        return;
                }
                if (user.code !== code) {
                        res.status(401).json({ msg: "El código ingresado es incorrecto." });
                        return;
                }
                await User.findOneAndUpdate({email},{verified: true});
                await sendConfirmationEmail(email);
                res.status(200).json({ msg: "Usuario verificado correctamente." });
        } catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Error en el servidor." });
        }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
        const { email, password }: IUser = req.body;
        try {
                const user = await User.findOne({ email });
                if (!user) {
                        res.status(400).json({ msg: "Usuario no encontrado." });
                        return;
                }
                const validatePassword = bcryptjs.compareSync(password, user.password);
                if (!validatePassword) {
                        res.status(400).json({ msg: "La contraseña es incorrecta." });
                        return;
                }
                const token = await generateJWT(user.id);
                res.status(200).json({ user, token });
        } catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Error en el servidor." });
        }
}
