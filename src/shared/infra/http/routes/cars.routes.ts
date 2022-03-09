import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationsController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsUseCases = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();


carsRoutes.get("/available", listAvailableCarsUseCases.handle);
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationsController.handle);

export { carsRoutes };
