import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationRoutes);
routes.use("/users", usersRoutes);
routes.use("/cars", carsRoutes);
routes.use(authenticateRoutes);


export { routes };