import { Router } from "express";
import Auth from "../../app/controllers/Auth/Auth";
import EditionsController from "../../app/controllers/Editions/EditionsController";

export default class EditionsRouter {
    constructor(
        private router: Router
    ) { }

    execute() {
        this.router.post('/editions', Auth.authenticateToken, EditionsController.store);
        this.router.get('/editions', Auth.authenticateToken, EditionsController.listEdition);
        this.router.get('/all-editions', Auth.authenticateToken, EditionsController.listAllEdition);
    }
}