import { query } from "../../../../../database";

export default class QueryDispatcher {
    constructor(
        private query: string,
        private userId: string
    ) { }

    execute() {
        return query(this.query, [this.userId]);
    }
}