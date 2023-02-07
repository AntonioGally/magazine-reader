import { query } from "../../../../../database";

export default class QueryDispatcher {
    constructor(
        private editionUrl: string,
        private editionCreatedDate: string,
        private magazineId: string,
        private query: string
    ) { }

    execute() {
        return query(this.query, [this.editionUrl, this.editionCreatedDate, this.magazineId])
    }
}