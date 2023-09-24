import { Request, Response } from "express"
import { ObjectId } from "mongoose";
import Order, { IOrder } from "../models/order";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
        const userId: ObjectId = req.body.confirmedUser._id;
        const search = { user: userId };
        const orders = await Order.find(search);
        res.json({ data: [...orders] });
}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
        const userId: ObjectId = req.body.confirmedUser._id;
        const createdOrder: IOrder = req.body;
        const data = { ...createdOrder, status: "pending", user: userId, createdAt: new Date() };
        const order = new Order(data);
        await order.save();
        res.status(201).json({ order });
}