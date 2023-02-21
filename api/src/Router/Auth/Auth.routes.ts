import { Router } from "express";
import Auth from "../../app/controllers/Auth/Auth";

export default class AuthRoutes {
    constructor(
        private router: Router
    ) { }

    execute() {
        this.router.post("/login", Auth.login);
        this.router.post("/signUp", Auth.signUp);
    }
}