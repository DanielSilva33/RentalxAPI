import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();

const createcarController = new CreateCarController();


carsRoutes.post("/", createcarController.handle);

export { carsRoutes };
