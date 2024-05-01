import "reflect-metadata";
import express from 'express';
import { AppDataSource } from './config/db-config';
import userRoute from './routers/User';
import productRoute from './routers/Product';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json())

    app.use("/data/api/v1/", userRoute);
    app.use("/data/api/v1/", productRoute);

    const port = process.env.SERVER_PORT as number | undefined;

    return app.listen(port, () => {
        console.log(`[Server]: Server is runing on port ${port}.`);
    });
}).catch((err) => console.log("Error: ", err));