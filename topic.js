const {Kafka} = require('kafkajs');

createTopic()

async function createTopic() {
    try {
        const kafka = new Kafka({
            clientId: 'clickstream_test',
            brokers: ['localhost:9093']
        })

        const admin = kafka.admin();
        console.log('Connecting....');
        await admin.connect();
        console.log('Connected..');
        await admin.createTopics(
            {
                'topics': [{
                    'topic': 'clickstream_test'
                }]
            }
        )
        console.log('Done!');
        await admin.disconnect();
    }
    catch(ex) {
        console.error(`Something happend ${ex}`)
    }
    finally {
        process.exit(0);
    }

    }
