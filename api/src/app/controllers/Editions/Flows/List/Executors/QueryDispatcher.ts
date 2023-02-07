import { query } from "../../../../../database";

export default class QueryDispatcher {
    constructor (
        private magazineId: string,
        private query: string
    ) {}

    execute() {
        return query(this.query, [this.magazineId]);
    }
}