import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
let obj = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,   
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT
};
console.log(obj);


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
    }
);



export default sequelize;
