import { Request, Response } from "express";
import MagazineCreator from "./flows/Creation/MagazineCreator";
import Edit from "./flows/Edit/Edit";
import GetMagazine from "./flows/GetInfo/GetMagazine";
import ListMagazine from "./flows/Listing/ListMagazine";
import StoreValidator from "./flows/Validators/Magazine/StoreValidator";
import { storePayload } from "./magazine.types";

class MagazineController {

    //Stores
    async storeMagazine(request: Request<any, any, storePayload>, response: Response) {
        if (!new StoreValidator(request.body).start()) {
            return response.status(400).json({ error: "Verify the inputs sended" })
        }
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        const magazine = await new MagazineCreator(request.body, userId).start() as unknown[];

        if (magazine.length === 0) {
            return response.status(500).json({ error: "Error on database creation process" })
        }
        return response.status(200).json(magazine[0]);
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

    async getMagazine(request: Request<any, any, { magazineId: string }>, response: Response) {
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });
        if (!request.body.magazineId) return response.status(400).json({ error: "magazine id needed" });

        const magazine = await new GetMagazine(request.body.magazineId, userId).start();
        if (magazine.length === 0 || !magazine) {
            return response.status(500).json({ error: "Error on magazine listing process" })
        }

        return response.status(200).json(magazine[0]);
    }

    //Edit
    async editMagazine(request: Request<any, any, storePayload["information"]>, response: Response) {
        const userId = request.headers["x-userid"];
        let magazineId = request.query.magazineId as string;
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });
        if (!magazineId) return response.status(400).json({ error: "magazine id needed" });

        const editedMagazine = await new Edit(request.body, magazineId, userId).start()
        if (!editedMagazine || editedMagazine.length === 0) return response.status(500).json({ error: "Error on magazine editing process" });

        return response.status(200).json(editedMagazine[0]);
    }

}

export default new MagazineController();