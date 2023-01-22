//Types
import { storePayload } from "../../../magazine.types";
//Executors
import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";
export default class MagazineCreator {
    constructor(
        private magazinePayload: storePayload
    ) { }
    
    async start() {
        let query = new BuildQuery().execute();
        new QueryDispatcher(this.magazinePayload, query).execute()
    }
}