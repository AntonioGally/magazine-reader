import { query } from "../../../../../database";
import { storePayload } from "../../../magazine.types";

export default class QueryDispatcher {
    constructor(
        private query: string,
        private payload: storePayload["information"],
        private magazineId: string,
        private userId: string
    ) { }

    execute() {
        return query(this.query, [
            this.payload.name,
            this.payload.description,
            this.payload.image,
            this.payload.url,
            this.payload.siteMap,
            this.payload.indexOf,
            this.magazineId,
            this.userId
        ])
    }
}