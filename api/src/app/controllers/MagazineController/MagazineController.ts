import { Request, Response } from "express";
import MagazineCreator from "./flows/Creation/Magazine/MagazineCreator";
import StoreValidator from "./flows/Validators/Magazine/StoreValidator";
import { storePayload } from "./magazine.types";

class MagazineController {

    async store(request: Request<any, any, storePayload>, response: Response) {
        if (!new StoreValidator(request.body).start()) {
            return response.status(400).json({ error: "Verify the inputs sended" })
        }
        const magazine = await new MagazineCreator(request.body).start();
        console.log(magazine);
    }
    
}

module.exports = new MagazineController();
