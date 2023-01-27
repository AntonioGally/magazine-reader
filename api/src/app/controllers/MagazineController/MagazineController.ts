import { Request, Response } from "express";
import MagazineCreator from "./flows/Creation/Magazine/MagazineCreator";
import SelectorCreator from "./flows/Creation/Selector/SelectorCreator";
import StoreValidator from "./flows/Validators/Magazine/StoreValidator";
import { storePayload, storeSelectorPayload } from "./magazine.types";

class MagazineController {

    async store(request: Request<any, any, storePayload>, response: Response) {
        if (!new StoreValidator(request.body).start()) {
            return response.status(400).json({ error: "Verify the inputs sended" })
        }
        const magazine = await new MagazineCreator(request.body).start() as unknown[];

        if (magazine.length === 0) {
            return response.status(500).json({ error: "Error on database creation process" })
        }
        return response.status(200).json(magazine[0]);
    }

    async storeSelector(request: Request<any, any, storeSelectorPayload>, response: Response) {
        const selectorPayload = request.body;
        const selector = await new SelectorCreator(selectorPayload).start();

        if (!selector) {
            return response.status(500).json({ error: "Error on database creation process" })
        }

        return response.status(200).json(selector[0]);
    }

}

export default new MagazineController();