import express, { Express } from "express";
import cors from "cors"
import { dbConnection } from "../config/database/config";
import authRouter from "../routes/auth";
import ordersRouter from "../routes/orders";

export class Server {
        app: Express;
        port: string | number | undefined;
        authPath: string;
        ordersPath: string;

        constructor() {
                this.app = express();
                this.port = process.env.PORT;
                this.authPath = '/auth';
                this.ordersPath = '/orders';

                this.connectDB();
                this.middleware();
                this.routes();
        }

        listen(): void {
                this.app.listen(this.port, () => { console.log(`Running on ${this.port} port`) });
        }

        middleware(): void {
                this.app.use(cors());
                this.app.use(express.json());
        }

        routes(): void {
                this.app.use(this.authPath, authRouter);
                this.app.use(this.ordersPath, ordersRouter);
        }

        async connectDB(): Promise<void> {
                await dbConnection();
        }
}