import nats from "node-nats-streaming";
import { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const clientId = randomBytes(4).toString("hex");
const stan = nats.connect("ticketing", clientId, {
    url: "http://localhost:4222",
});

stan.on("connect", () => {
    console.log("Listener connected to NATS");

    stan.on("close", () => {
        console.log("NATS connection closed");
        process.exit();
    });

    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable() // re emit all events (here only used for very first time)
        .setDurableName("orders-service"); // re emit missed events (unprocessed events)

    const subscription = stan.subscribe(
        "ticket:created",
        "orders-service-queue-group", // queue group required for durable as well as not sending same event to multiple listeners
        options
    );
    subscription.on("message", (msg: Message) => {
        console.log("Message received");
        const data = msg.getData();
        if (typeof data === "string") {
            console.log(`#${msg.getSequence()}. Received data: ${data}`);
        }
        msg.ack();
    });
});

process.on("SIGINT", () => stan.close()); // Interrupt signal
process.on("SIGTERM", () => stan.close()); // Terminate signal
