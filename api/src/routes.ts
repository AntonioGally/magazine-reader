import { Router } from "express";
//Controllers
import MagazineController from "./app/controllers/MagazineController/MagazineController";
import Auth from "./app/controllers/Auth/Auth";
import EditionsController from "./app/controllers/Editions/EditionsController";

export const router = Router();

//Auth
router.post("/login", Auth.login);
router.post("/signUp", Auth.signUp);

//Magazine
router.post('/magazine', Auth.authenticateToken, MagazineController.storeMagazine);
router.get('/magazine', Auth.authenticateToken, MagazineController.listMagazine);
router.put('/magazine', Auth.authenticateToken, MagazineController.editMagazine);
router.delete('/magazine', Auth.authenticateToken, MagazineController.deleteMagazine);
router.get('/get-magazine', Auth.authenticateToken, MagazineController.getMagazine);


//Editions
router.post('/editions', Auth.authenticateToken, EditionsController.store);
router.get('/editions', Auth.authenticateToken, EditionsController.listEdition);
router.get('/all-editions', Auth.authenticateToken, EditionsController.listAllEdition);
