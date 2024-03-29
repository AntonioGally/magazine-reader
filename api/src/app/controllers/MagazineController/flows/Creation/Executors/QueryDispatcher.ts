import { storePayload } from "../../../magazine.types";
import { query } from "../../../../../database";

export default class QueryDispatcher {
    constructor(
        private magazinePayload: storePayload,
        private userId: string,
        private query: string
    ) { }

    async execute() {
        const { name, description, image, url, creationDate, siteMap, indexOf, updatePeriod, siteMapExists } = this.magazinePayload.information;
        return query(this.query, [name, description, image, url, creationDate, updatePeriod, siteMapExists, this.userId, siteMap, indexOf]);
    }
}