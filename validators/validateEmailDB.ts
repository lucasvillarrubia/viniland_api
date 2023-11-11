import User, { IUser } from "../models/user"
import { sendVerificationEmail } from "../services/mailer";

export const emailExists = async (email: string): Promise<void> => {
        const emailDoesExist: IUser | null = await User.findOne({ email });
        if (emailDoesExist && emailDoesExist.verified) { throw new Error(`El correo ${email} ya está registrado.`) }
        if (emailDoesExist && !emailDoesExist.verified) {
                await sendVerificationEmail(email, emailDoesExist.code as string);
                throw new Error(`El correo ya está registrado pero no verificado, se envió nuevamente un código de verificación a ${email}`);
        }
}