import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsProvider } from "./DateProvider/implementation/DayjsProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsProvider);
