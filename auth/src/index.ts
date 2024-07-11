import mongoose from "mongoose";
import "dotenv/config";
import { app } from "./app";

const start = async () => {
    const PORT = process.env.PORT || 3001;
    const username = process.env.mongo_USER;
    const pass = process.env.mongo_PASS;
    const db_name = process.env.mongo_DB_NAME;
    try {
        const connection = await mongoose.connect(
            `mongodb+srv://${username}:${pass}@newcluster.zcb8pse.mongodb.net/${db_name}`
        );
        console.log(
            "Successfully connected to DB.",
            connection.connection.name,
            connection.connection.host,
            connection.connection.port
        );
    } catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
    });
};

start();
