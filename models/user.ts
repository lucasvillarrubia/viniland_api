import { Schema, Model, model } from "mongoose";
import { ROLES } from "../utils/constants";

export interface IUser {
        name: string;
        email: string;
        password: string;
        role?: string;
        code?: string;
        verified?: boolean;
}

const UserSchema = new Schema<IUser> ({
        name: { type: String, required: [true, "El nombre es obligatorio"] },
        email: { type: String, required: [true, "El correo es obligatorio"] },
        password: { type: String, required: [true, "La contraseña es obligatoria"] },
        role: { type: String, default: ROLES.user },
        code: { type: String },
        verified: { type: Boolean, default: false }
})

UserSchema.methods.toJSON = function() {
        const { __v, _id, code, password, ...user } = this.toObject();
        return user;
}

const User: Model<IUser> = model<IUser> ('User', UserSchema);

export default User