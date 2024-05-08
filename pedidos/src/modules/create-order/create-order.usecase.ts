import { prismaClient } from "../../infra/database/prismaClient";

type CreateOrderRequest = {
  customerId: string;
  status: string;
  items: [
    {
      productId: string;
      quantity: number;
    }
  ];
};

export class CreateOrderUseCase {
  constructor() {}

  async execute(data: CreateOrderRequest) {
    //a fazer requisição para API de produtos para verificar se tem estoque
    //vou usar axios.get('/products')
    const order = await prismaClient.order.create({
      data: {
        customerId: data.customerId,
        status: "AGUARDANDO_PAGAMENTO",
        OrderItems: {
          createMany: {
            data: data.items,
          },
        },
      },
    });

    return order;
  }
}
