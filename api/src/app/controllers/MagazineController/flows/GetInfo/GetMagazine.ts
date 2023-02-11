import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";

export default class GetMagazine {
    constructor (
        private magazineId: string,
        private userId: string
    ) {}

    start() {
        let query = new BuildQuery().execute()
        return new QueryDispatcher(query, this.magazineId, this.userId).execute();
    }
}