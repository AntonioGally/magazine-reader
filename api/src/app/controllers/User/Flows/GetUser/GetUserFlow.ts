import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";

export default class GetUserFlow {
    constructor(
        private userId: string
    ) { }

    start() {
        let query = new BuildQuery().execute();
        return new QueryDispatcher(this.userId, query).execute();
    }
}