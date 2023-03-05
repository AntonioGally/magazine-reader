import { Router } from "express";
import AuthRoutes from "./Auth/Auth.routes";
import EditionsRouter from "./Editions/Editions.routes";
import MagazinesRouter from "./Magazines/Magazines.routes";
import UserRouter from "./User/User.routes";
//Controllers

export const router = Router();

new AuthRoutes(router).execute();
new MagazinesRouter(router).execute();
new EditionsRouter(router).execute();
new UserRouter(router).execute();