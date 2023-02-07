import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";

export default class ListEditions {
    constructor (
        private magazineId: string
    ) {}

    async start() {
        let query = new BuildQuery().execute();
        return new QueryDispatcher(this.magazineId, query).execute();
    }
}