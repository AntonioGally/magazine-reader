import { Router } from "express";
import Auth from "../../app/controllers/Auth/Auth";
import UserController from "../../app/controllers/User/UserController";

export default class UserRouter {
    constructor(
        private router: Router
    ) { }

    execute() {
        this.router.get('/user', Auth.authenticateToken, UserController.getUser);
        this.router.put('/user', Auth.authenticateToken, UserController.editUser);
    }
}