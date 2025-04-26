const amqp = require('amqplib');
require('dotenv').config();

const RABBITMQ_URL = process.env.RABBIT_URL ;

let connection, channel;

async function connect() {
    try {
        // Connect to CloudAMQP
        connection = await amqp.connect(RABBITMQ_URL);
        
        // Create a channel
        channel = await connection.createChannel();
        
        console.log('Connected to RabbitMQ');

        // Handle connection errors
        connection.on('error', (err) => {
            console.error('RabbitMQ Connection Error:', err);
            setTimeout(connect, 5000);
        });

        connection.on('close', () => {
            console.log('RabbitMQ Connection Closed');
            setTimeout(connect, 5000);
        });

    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error.message);
        setTimeout(connect, 5000);
    }
}

async function publishToQueue(queueName, data) {
    try {
        if (!channel) await connect();
        await channel.assertQueue(queueName, { durable: true });
        return channel.sendToQueue(queueName, Buffer.from(data), {
            persistent: true
        });
    } catch (error) {
        console.error('Error publishing to queue:', error);
        throw error;
    }
}

async function subscribeToQueue(queueName, callback) {
    try {
        if (!channel) await connect();
        await channel.assertQueue(queueName, { durable: true });
        channel.consume(queueName, (message) => {
            if (message) {
                callback(message.content.toString());
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('Error subscribing to queue:', error);
        throw error;
    }
}

module.exports = {
    connect,
    publishToQueue,
    subscribeToQueue
};