//Types
import { storePayload } from "../../magazine.types";
//Executors
import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";
export default class MagazineCreator {
    constructor(
        private magazinePayload: storePayload,
        private userId: string
    ) { }
    
    async start() {
        let query = new BuildQuery().execute();
        return new QueryDispatcher(this.magazinePayload, this.userId, query).execute()
    }
}