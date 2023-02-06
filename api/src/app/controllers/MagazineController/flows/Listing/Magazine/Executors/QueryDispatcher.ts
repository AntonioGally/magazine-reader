import { query } from "../../../../../../database";

export default class QueryDispatcher {
    constructor(
        private userId: string,
        private query: string
    ) { }

    execute() {
        return query(this.query, [this.userId]);
    }
}