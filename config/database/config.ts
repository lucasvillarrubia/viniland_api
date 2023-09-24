import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
        try {
                const dbURL = process.env.DB_URL as string;
                if (!dbURL) { throw new Error("No está definida la url como variable de entorno.") }
                await mongoose.connect(dbURL);
                console.log("Database online");
        } catch (error) {
                console.log(error);
                throw new Error("Se produjo un error al iniciar la base de datos.")
        }
}