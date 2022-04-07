import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { DayjsProvider } from "./implementation/DayjsProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsProvider);
