const { Router } = require('express');
//Controllers
const MagazineController = require("./app/controllers/MagazineController/MagazineController");
import Auth from "./app/controllers/Auth/Auth";

const router = Router();

//Auth
router.post("/login", Auth.login);

//Magazine
router.post('/magazine', Auth.authenticateToken, MagazineController.store);

module.exports = router;