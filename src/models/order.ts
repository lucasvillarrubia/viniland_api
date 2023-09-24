import { Model, Types, model, Schema } from "mongoose";

interface IShippingDetails {
        name: string;
        phone: string;
        location: string;
        address: string;
}
interface IItem {
        name: string;
        author: string;
        id: number;
        price: number;
        xAdded: number;
}

export interface IOrder {
        createdAt: Date;
        status: string;
        price: number;
        shippingCost: number;
        total: number;
        user: Types.ObjectId;
        items: IItem[];
        shippingDetails: IShippingDetails;
}

const OrderSchema = new Schema<IOrder> ({
        createdAt: { type: Date, default: Date.now },
        status: { type: String, required: true },
        price: { type: Number, required: true },
        shippingCost: { type: Number },
        total: { type: Number, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true},
        items: {
                type: [{
                        name: { type: String, required: true },
                        author: { type: String, required: true },
                        id: { type: Number, required: true },
                        price: { type: Number, required: true },
                        xAdded: { type: Number, required: true }
                }],
                required: true
        },
        shippingDetails: {
                name: { type: String, required: true },
                phone: { type: String, required: true },
                location: { type: String, required: true },
                address: { type: String, required: true }
        }
})

const Order: Model<IOrder> = model<IOrder> ("Order", OrderSchema);

export default Order