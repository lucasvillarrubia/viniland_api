import jwt from "jsonwebtoken";

const generateJWT = (id: string = ''): Promise<string> => {
        return new Promise((res, rej) => {
                const payload = { id };
                jwt.sign(
                        payload,
                        process.env.SECRET_JWT_KEY as string,
                        { expiresIn: "1h" },
                        (err: Error | null, token: string | undefined) => {
                                if (err) {
                                        console.log(err);
                                        rej("Error al general el token");
                                }
                                else {
                                        res(token as string);
                                }
                        }
                )
        });
}

export default generateJWT