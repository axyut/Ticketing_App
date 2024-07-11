import mongoose from "mongoose";
import "dotenv/config";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { app } from "./app";

const PORT = process.env.PORT || 3004;
const username = process.env.mongo_USER!;
const pass = process.env.mongo_PASS!;
const db_name = process.env.mongo_DB_NAME || "ticketing_ticketsDB";
const JWT_KEY = process.env.JWT_KEY || "abcd";
const nats_client = process.env.NATS_CLIENT_ID || "ticketing";
const nats_url = process.env.NATS_URL || "http://localhost:4222";
const nats_cluster = process.env.NATS_CLUSTER_ID || "ticketing";

const start = async () => {
    try {
        await natsWrapper.connect(nats_cluster, nats_client, nats_url);
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed!");
            process.exit();
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();

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
