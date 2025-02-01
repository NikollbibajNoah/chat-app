import knex from "knex";
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
    client: "mysql2",
    connection: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT as string),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    }
});

export {db}