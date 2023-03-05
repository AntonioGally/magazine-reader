import { query } from "../../../../../database";
import { editUserPayload } from "../../../user.types";

export default class QueryDispatcher {
    constructor(
        private payload: editUserPayload,
        private userId: string,
        private query: string
    ) { }

    execute() {
        return query(this.query, [this.payload.name, this.payload.lastName,
        this.payload.email, this.payload.password, this.userId])
    }
}