const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "clickstream",
      brokers: ["localhost:9093"],
    });

    const consumer = kafka.consumer({
        "groupId": "clickstream_consumer_group_1"
    });
    console.log("Connecting....");
    await consumer.connect();
    console.log("Connected..");


    await consumer.subscribe({
        "topic": "clickstream",
        "fromBeginning": true
    })

    await consumer.run(
        {
            "eachMessage": async result => {
                console.log(result.message.value.toString())
            }
        }
    )

  } catch (ex) {
    console.error(`Something happend ${ex}`);
  } 
}
