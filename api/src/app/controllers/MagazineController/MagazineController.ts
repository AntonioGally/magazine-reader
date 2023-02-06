import { Request, Response } from "express";
import MagazineCreator from "./flows/Creation/Magazine/MagazineCreator";
import SelectorCreator from "./flows/Creation/Selector/SelectorCreator";
import ListMagazine from "./flows/Listing/Magazine/ListMagazine";
import StoreValidator from "./flows/Validators/Magazine/StoreValidator";
import { storePayload, storeSelectorPayload } from "./magazine.types";

class MagazineController {

    //Stores
    async storeMagazine(request: Request<any, any, storePayload>, response: Response) {
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

    //Lists
    async listMagazine(request: Request, response: Response) {
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });
        const magazines = await new ListMagazine(userId).start();
        if (!magazines) {
            return response.status(500).json({ error: "Error on magazine listing process" })
        }

        return response.status(200).json(magazines);
    }

}

export default new MagazineController();