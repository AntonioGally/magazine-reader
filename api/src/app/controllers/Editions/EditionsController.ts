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
        try {
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
        } catch (error) {
            response.status(400).json({ magazineInfo, error })
        }
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

    async paginatedEditions(request: Request, response: Response) {
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        const editions = await new ListAllEditions(userId).start();
        if (!editions) {
            response.status(500).json({ error: "Error on listing edition process" })
        }

        const page = parseInt(request.query.page as string);
        const limit = parseInt(request.query.limit as string);
        const query = request.query.q as string || "";
        const urlSort = request.query.urlSort as "ascend" | "descend" | undefined;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {} as any;
        if (endIndex < editions.length) {
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

        let sortedEditions = editions.slice().sort((a, b) => {
            let _a = Number(a.editionurl.split("/").at(-1));
            let _b = Number(b.editionurl.split("/").at(-1));
            if (urlSort === "ascend") {
                return _a > _b ? -1 : 1;
            } else if (urlSort === "descend") return _a < _b ? -1 : 1;
            else return 0
        });

        let filteredEditions = sortedEditions.filter(item => Object.keys(item).some(
            (keys) => {
                return item[keys] != null && item[keys].toString().toLowerCase().includes(query.toLowerCase())
            }
        ));

        results.totalRecords = filteredEditions.length;
        results.results = filteredEditions.slice(startIndex, endIndex);
        response.status(200).json(results);
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