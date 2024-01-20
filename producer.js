const { Kafka } = require("kafkajs");
const { Partitioners } = require("kafkajs");

async function run(data) {
  try {
    const kafka = new Kafka({
      clientId: "clickstream_test",
      brokers: ["localhost:9093"],
    });

    const producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
    console.log("Connecting....");
    await producer.connect();
    console.log("Connected..");

    const result = await producer.send({
      topic: "clickstream_test",
      messages: [
        {
          value: data,
        },
      ],
    });

    console.log(`Sent succesfully ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.error(`Something happend ${ex}`);
  } finally {
    process.exit(0);
  }
}

module.exports = {run}
