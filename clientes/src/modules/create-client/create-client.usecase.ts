import { prismaClient } from "../../infra/database/prismaClient";
import { kafka } from "../../infra/provider/kafka";
import { KafkaSendMesssage } from "../../infra/provider/kafka/producer";

type CreateClientRequest = {
  name: string;
  password: string;
  email: string;
  phone: string;
};

export class CreateClientUseRequest {
  constructor() {}

  async execute(data: CreateClientRequest) {
    const customer = await prismaClient.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (customer) throw new Error("Customer already exists");

    const customerCreated = await prismaClient.client.create({
      data: {
        ...data,
      },
    });

    const kafkaProducer = new KafkaSendMesssage();
    await kafkaProducer.execute("cliente", {
      id: customerCreated.id,
      email: customerCreated.email,
    });

    return customerCreated;
  }
}
