import { query } from "../../../../../database";

export default class QueryDispatcher {
    constructor(
        private query: string,
        private magazineId: string
    ) { }

    execute() {
        return query(this.query, [this.magazineId]);
    }
}