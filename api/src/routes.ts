const { Router } = require('express');
//Controllers
import MagazineController from "./app/controllers/MagazineController/MagazineController";
import Auth from "./app/controllers/Auth/Auth";
import EditionsController from "./app/controllers/Editions/EditionsController";

const router = Router();

//Auth
router.post("/login", Auth.login);
router.post("/signUp", Auth.signUp);

//Magazine
router.post('/magazine', Auth.authenticateToken, MagazineController.storeMagazine);
router.get('/magazine', Auth.authenticateToken, MagazineController.listMagazine);

//Editions
router.post('/editions', Auth.authenticateToken, EditionsController.store);
router.get('/editions', Auth.authenticateToken, EditionsController.listEdition);
router.post('/test', EditionsController.readSiteMap);

module.exports = router;