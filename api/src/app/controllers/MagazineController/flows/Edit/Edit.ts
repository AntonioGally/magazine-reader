import { storePayload } from "../../magazine.types";
import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";

export default class Edit {
    constructor (
        private payload: storePayload["information"],
        private magazineId: string,
        private userId: string
    ) {}

    start() {
        let query = new BuildQuery().execute();
        return new QueryDispatcher(query, this.payload, this.magazineId, this.userId).execute();
    }
}