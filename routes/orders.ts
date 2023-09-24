import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders";
import validateJWT from "../validators/validateJWT";
import { check } from "express-validator";
import { collectErrors } from "../middleware/collectErrors";
import { verifiedCheck } from "../middleware/verifiedCheck";

const router = Router();

router.get('/', [validateJWT, collectErrors], getOrders);

router.post('/', [
        validateJWT,
        verifiedCheck,
        check('price', 'El precio es requerido.').not().isEmpty(),
        check('shippingCost', 'El costo de envío es requerido.').not().isEmpty(),
        check('total', 'El costo total de la orden es requerido.').not().isEmpty(),
        check('shippingDetails', 'Los detalles de envío son requeridos.').not().isEmpty(),
        check('items', 'El conjunto de productos es requerido.').not().isEmpty(),
        collectErrors
        ], createOrder);

export default router