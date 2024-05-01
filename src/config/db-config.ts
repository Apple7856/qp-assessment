import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../**/entites/*.{ts,js}`],
    synchronize: true,
    // logging: true,
});
