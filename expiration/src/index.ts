import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

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
    } catch (err) {
        console.error(err);
    }
};

start();
