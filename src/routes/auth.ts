import { Router } from "express";
import { loginUser, registerUser, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { collectErrors } from "../middleware/collectErrors";
import { emailExists } from "../validators/validateEmailDB";

const router = Router();

router.post('/signup', [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El correo es inválido.').isEmail(),
        check('email').custom(emailExists),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
        collectErrors
        ], registerUser);

router.patch('/verify', [
        check('email', 'El correo es inválido.').isEmail(),
        check('code', 'El código de verificación es obligatorio.').not().isEmpty(),
        collectErrors
        ], verifyUser);

router.post('/login', [
        check('email', 'El correo es inválido.').isEmail(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
        collectErrors
        ], loginUser);

export default router