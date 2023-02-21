import { Router } from "express";

import Auth from "../../app/controllers/Auth/Auth";
import MagazineController from "../../app/controllers/MagazineController/MagazineController";

export default class MagazinesRouter {
    constructor(
        private router: Router
    ) { }

    execute() {
        this.router.post('/magazine', Auth.authenticateToken, MagazineController.storeMagazine);
        this.router.get('/magazine', Auth.authenticateToken, MagazineController.listMagazine);
        this.router.put('/magazine', Auth.authenticateToken, MagazineController.editMagazine);
        this.router.delete('/magazine', Auth.authenticateToken, MagazineController.deleteMagazine);
        this.router.get('/get-magazine', Auth.authenticateToken, MagazineController.getMagazine);
    }
}