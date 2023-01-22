import { Request, Response } from "express";
import MagazineCreator from "./flows/Creation/Magazine/MagazineCreator";
import StoreValidator from "./flows/Validators/Magazine/StoreValidator";
import { storePayload } from "./magazine.types";

class MagazineController {
    store(request: Request<any, any, storePayload>, response: Response) {
        if (!new StoreValidator(request.body).start()) {
            return response.status(400).json({ error: "Verify the inputs sended" })
        }
        new MagazineCreator(request.body.information).start();
    }
}

module.exports = new MagazineController();