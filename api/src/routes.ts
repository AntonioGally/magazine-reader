const { Router } = require('express');
//Controllers
import MagazineController from "./app/controllers/MagazineController/MagazineController";
import Auth from "./app/controllers/Auth/Auth";

const router = Router();

//Auth
router.post("/login", Auth.login);
router.post("/signUp", Auth.signUp);

//Magazine
router.post('/magazine', Auth.authenticateToken, MagazineController.store);
router.post('/selector', Auth.authenticateToken, MagazineController.storeSelector);

module.exports = router;