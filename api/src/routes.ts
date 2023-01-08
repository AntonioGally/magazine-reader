const { Router } = require('express');
//Controllers
const MagazineController = require("./app/controllers/MagazineController/MagazineController");

const router = Router();

router.post('/magazine', MagazineController.store);

module.exports = router;