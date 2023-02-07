//Types
import { Request, Response } from "express";
import { storeEditions } from "./editions.types";
import CreateEdition from "./Flows/Create/CreateEdition";
import ListEditions from "./Flows/List/ListEditions";
import GetLinksFromDatabase from "./Flows/Read/GetLinksFromDatabase";
import SiteMapReader from "./Flows/Read/SiteMapReader";

class EditionsController {

    async readSiteMap(siteMap: string, _indexOf: string) {
        return new SiteMapReader(siteMap, _indexOf).start();
    }

    async store(request: Request<any, any, storeEditions>, response: Response) {
        const { siteMap, _indexOf, magazineId } = request.body
        const updatedLinks = await new SiteMapReader(siteMap, _indexOf).start();
        const createdLinks = [];
        for (let i = 0; i < updatedLinks.length; i++) {
            let link = updatedLinks[i];
            let databaseLink = await new GetLinksFromDatabase(link).excute()
            if (databaseLink.length === 0) {
                await new CreateEdition(link, magazineId).start();
                createdLinks.push(link);
            }
        }

        response.json(createdLinks);
    }

    async listEdition(request: Request, response: Response) {
        const magazineId = request.query.magazineId as string;
        const editions = await new ListEditions(magazineId).start();
        if (!editions || editions.length === 0) {
            response.status(500).json({ error: "Error on listing edition process" })
        }

        response.json(editions);
    }

}

export default new EditionsController();