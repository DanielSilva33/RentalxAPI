import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const routes = Router();

routes.use(categoriesRoutes);
routes.use(specificationRoutes);
routes.use(usersRoutes);
routes.use(authenticateRoutes);


export { routes };