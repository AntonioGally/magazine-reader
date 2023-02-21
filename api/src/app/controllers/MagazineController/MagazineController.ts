import { NextFunction, Request, Response } from "express";
import MagazineCreator from "./flows/Creation/MagazineCreator";
import Delete from "./flows/Delete/Delete";
import DeleteEdition from "../Editions/Flows/Delete/Delete";
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
    async listMagazines(request: Request, response: Response) {
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });
        const magazines = await new ListMagazine(userId).start();
        if (!magazines) {
            return response.status(500).json({ error: "Error on magazine listing process" })
        }

        return response.status(200).json(magazines);
    }

    async paginatedMagazines(request: Request, response: Response) {
        const userId = request.headers["x-userid"];

        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });
        const magazines = await new ListMagazine(userId).start();
        if (!magazines) {
            return response.status(500).json({ error: "Error on magazine listing process" })
        }

        const page = parseInt(request.query.page as string);
        const limit = parseInt(request.query.limit as string);
        const query = request.query.q as string;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {} as any;
        if (endIndex < magazines.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        let filteredMagazines = magazines.filter(magazine => {
            let _name = magazine.magazinename.trim().toLowerCase();
            let _search = query.trim().toLowerCase();
            return _name.indexOf(_search) > -1;
        })

        results.totalRecords = filteredMagazines.length;
        results.results = filteredMagazines.slice(startIndex, endIndex);

        response.status(200).json(results);
    }

    async getMagazine(request: Request<any, any, { magazineId: string }>, response: Response) {
        const userId = request.headers["x-userid"];
        let magazineId = request.query.magazineId as string;
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });
        if (!magazineId) return response.status(400).json({ error: "magazine id needed" });

        const magazine = await new GetMagazine(magazineId, userId).start();
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

    //Delete
    async deleteMagazine(request: Request, response: Response) {
        const userId = request.headers["x-userid"];
        let magazineId = request.query.magazineId as string;
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });
        if (!magazineId) return response.status(400).json({ error: "magazine id needed" });

        const deletedEditions = await new DeleteEdition(magazineId).start();
        const deletedMagazine = await new Delete(userId, magazineId).start();
        if (!deletedMagazine || !deletedEditions) return response.status(500).json({ error: "Error on magazine deleting process" });

        return response.sendStatus(200);
    }

}

export default new MagazineController();