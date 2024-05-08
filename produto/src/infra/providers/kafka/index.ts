import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: ["flowing-parrot-12765-us1-kafka.upstash.io:9092"],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: "Zmxvd2luZy1wYXJyb3QtMTI3NjUkgJ2qKcIiFf4NvS3GG7Qzf4V8r_JpHlMlN9U",
    password: "NTI3ZjIzYzEtZTg1MS00Y2I2LTllYWMtZTBmNzNkNmQ2Y2Ew",
  },
});

export { kafka };
