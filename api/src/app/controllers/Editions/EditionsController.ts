//Types
import { Request, Response } from "express";
import GetMagazine from "../MagazineController/flows/GetInfo/GetMagazine";
import { storeEditions } from "./editions.types";
import CreateEdition from "./Flows/Create/CreateEdition";
import Delete from "./Flows/Delete/Delete";
import ListEditions from "./Flows/List/ListEditions";
import ListAllEditions from "./Flows/ListAll/ListAllEditions";
import GetLinksFromDatabase from "./Flows/Read/GetLinksFromDatabase";
import SiteMapReader from "./Flows/Read/SiteMapReader";

class EditionsController {

    async readSiteMap(siteMap: string, _indexOf: string) {
        return new SiteMapReader(siteMap, _indexOf).start();
    }

    async store(request: Request<any, any, storeEditions>, response: Response) {
        const userId = request.headers["x-userid"];
        const { magazineId } = request.body
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        const [magazineInfo] = await new GetMagazine(magazineId, userId).start();
        const updatedLinks = await new SiteMapReader(magazineInfo.magazinesitemap, magazineInfo.magazineindexof).start();
        const createdLinks = [];
        for (let i = 0; i < updatedLinks.length; i++) {
            let link = updatedLinks[i];
            let databaseLink = await new GetLinksFromDatabase(link).excute()
            if (databaseLink.length === 0) {
                await new CreateEdition(link, magazineId).start();
                createdLinks.push({
                    newEdition: link,
                    magazineName: magazineInfo.magazinename,
                    magazineUrl: magazineInfo.magazineurl
                });
            }
        }

        response.json(createdLinks);
    }

    async listEdition(request: Request, response: Response) {
        const magazineId = request.query.magazineId as string;
        const editions = await new ListEditions(magazineId).start();
        if (!editions) {
            response.status(500).json({ error: "Error on listing edition process" })
        }

        response.json(editions);
    }

    async listAllEdition(request: Request, response: Response) {
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        const editions = await new ListAllEditions(userId).start();
        if (!editions) {
            response.status(500).json({ error: "Error on listing edition process" })
        }

        response.json(editions);
    }

    async deleteEdition(request: Request, response: Response) {
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        const edition = await new Delete(userId).start();
        if (!edition) {
            response.status(500).json({ error: "Error on deleting edition process" })
        }
        response.sendStatus(200);
    }

}

export default new EditionsController();