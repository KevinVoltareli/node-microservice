import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

type ProductConsumer = {
  id: string;
  code: string;
};

export async function createProductConsumer() {
  console.log("CUSTOMER CONSUMER");
  const consumer = await kafkaConsumer("PRODUCT_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const customer = JSON.parse(messageToString) as ProductConsumer;

      await prismaClient.product.create({
        data: {
          externalId: customer.id,
          code: customer.code,
        },
      });
    },
  });
}

createProductConsumer();
