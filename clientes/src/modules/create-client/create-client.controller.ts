import { Request, Response } from "express";
import { CreateClientUseRequest } from "./create-client.usecase";

export class CreateCustomerController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const useCase = new CreateClientUseRequest();

    try {
      const result = await useCase.execute(request.body);
      console.log(result);
      return response.status(201).send();
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
