import { storePayload } from "../../../../magazine.types";
import { query } from "../../../../../../database";

export default class QueryDispatcher {
    constructor(
        private magazinePayload: storePayload,
        private query: string
    ) { }

    async execute() {
        const { name, description, image, url, creationDate } = this.magazinePayload.information;
        const { userId } = this.magazinePayload;
        return query(this.query, [name, description, image, url, creationDate, userId]);
    }
}