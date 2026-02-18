import dotenv from "dotenv";
import app from "./app.js";
import db from "./models/index.js";
dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log("Database connection has been established successfully.");

        await db.sequelize.sync();
        console.log("Tables Synced successfully✅");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();