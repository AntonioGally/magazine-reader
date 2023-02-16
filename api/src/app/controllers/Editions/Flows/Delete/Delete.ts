import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";

export default class Delete {
    constructor(
        private magazineId: string
    ) { }

    start() {
        let query = new BuildQuery().execute();
        return new QueryDispatcher(query, this.magazineId).execute();
    }
}