import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "vinilandshop@gmail.com", pass: "yyfnfdmkyzlawizb" },
        from: "vinilandshop@gmail.com"
});

export const sendVerificationEmail = async (to: string, code: string): Promise<void> => {
        try {
                const mailInfo = {
                        from: '"Viniland" vinilandshop@gmail.com',
                        to,
                        subject: "Código de verificación de usuario",
                        text: `El código es ${code}`
                }
                await transporter.sendMail(mailInfo);
                console.log(`Correo enviado a ${to}`);
        } catch (error) {
                console.error("Error al enviar el correo de verificación", error);
        }
}

export const sendConfirmationEmail = async (to: string): Promise<void> => {
        try {
                const mailInfo = {
                        from: '"Viniland" vinilandshop@gmail.com',
                        to,
                        subject: "Confirmación de usuario",
                        text: `Tu usuario fue verificado correctamente. ¡Bienvenido a Viniland!`
                }
                await transporter.sendMail(mailInfo);
                console.log(`Correo enviado a ${to}`);
        } catch (error) {
                console.error("Error al enviar el correo de confirmación", error);
        }
}