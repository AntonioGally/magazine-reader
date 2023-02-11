import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";

export default class ListAllEditions {
    constructor(
        private userId: string
    ) { }

    start() {
        let query = new BuildQuery().execute();
        return new QueryDispatcher(query, this.userId).execute();
    }
}