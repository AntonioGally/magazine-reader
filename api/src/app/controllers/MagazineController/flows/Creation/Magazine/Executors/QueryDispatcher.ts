import { storePayload } from "../../../../magazine.types";
const db = require("../../../../../../database");

export default class QueryDispatcher {
    constructor(
        private magazineInfo: storePayload["information"],
        private query: string
    ) { }

    execute() {
        return new Promise((resolve, reject) => {
            const { name, description, image, url } = this.magazineInfo;
            // db.query(this.query, [])
        })
    }
}