import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMesssage } from "../../infra/providers/kafka/producer";

type UpdateOrderRequest = {
  id: string;
  status: string;
};

export class UpdateOrderUseCase {
  constructor() {}

  async execute(data: UpdateOrderRequest) {
    const orderUpdate = await prismaClient.order.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });

    const kafkaSendMessage = new KafkaSendMesssage();
    await kafkaSendMessage.execute("ORDER_STATUS", {
      customerId: orderUpdate.customerId,
      status: orderUpdate.status,
    });
  }
}
