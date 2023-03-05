//Types
import { Request, Response } from "express";
import { getFormattedDate } from "../../../scripts/util";
import GetMagazine from "../MagazineController/flows/GetInfo/GetMagazine";
import { storeEditions } from "./editions.types";
import CreateEdition from "./Flows/Create/CreateEdition";
import Delete from "./Flows/Delete/Delete";
import ListEditions from "./Flows/List/ListEditions";
import ListAllEditions from "./Flows/ListAll/ListAllEditions";
import GetLinksFromDatabase from "./Flows/Read/GetLinksFromDatabase";
import SiteMapReader from "./Flows/Read/SiteMapReader";

class EditionsController {

    async store(request: Request<any, any, storeEditions>, response: Response) {
        const userId = request.headers["x-userid"];
        const { magazineId } = request.body
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        const [magazineInfo] = await new GetMagazine(magazineId, userId).start();
        try {
            const updatedLinks = await new SiteMapReader(magazineInfo).start();
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
            response.status(500).json({ magazineInfo, error })
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
        const urlSort = request.query.urlSort === "undefined" ? undefined : request.query.urlSort;
        const creationDateSort = request.query.creationDateSort === "undefined" ? undefined : request.query.creationDateSort;
        const creationDateFilter = request.query.creationDateFilter === "null" ? null : request.query.creationDateFilter;
        const query = request.query.q as string || "";

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
            if (urlSort) {
                let _a = a.editionurl.toLowerCase().trim();
                let _b = b.editionurl.toLowerCase().trim();
                if (urlSort === "ascend") {
                    return _a.localeCompare(_b);
                } else if (urlSort === "descend") return _b.localeCompare(_a);
                else return 0
            } else if (creationDateSort) {
                let _a = new Date(a.editioncreateddate).getTime();
                let _b = new Date(b.editioncreateddate).getTime();
                if (creationDateSort === "ascend") {
                    return _a - _b;
                } else if (creationDateSort === "descend") return _b - _a;
                else return 0
            }
            return 0;
        });

        let globalyFilteredEditions = sortedEditions.filter(item => Object.keys(item).some(
            (keys) => {
                return item[keys] != null && item[keys].toString().toLowerCase().includes(query.toLowerCase())
            }
        ));

        if (creationDateFilter) {
            globalyFilteredEditions = globalyFilteredEditions.filter(item => {
                let formattedDate = getFormattedDate(item.editioncreateddate);
                return formattedDate.dateString.trim().indexOf(creationDateFilter as string) > -1;
            })
        }

        results.totalRecords = globalyFilteredEditions.length;
        results.results = globalyFilteredEditions.slice(startIndex, endIndex);
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