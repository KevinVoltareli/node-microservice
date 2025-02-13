import { Router } from "express";
import { CraeteOrderController } from "../modules/create-order/create-order.controller";
import { UpdateOrderController } from "../modules/update-order/update-order.controller";

const router = Router();

router.post("/orders", (request, response) => {
  new CraeteOrderController().handle(request, response);
});

router.patch("/orders", (request, response) => {
  new UpdateOrderController().handle(request, response);
});

export { router };
