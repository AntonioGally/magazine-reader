import { generateDate } from "../../../../../scripts/util";
import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";

export default class CreateEdition {
    constructor (
        private editionUrl: string,
        private magazineId: string
    ) {}

    async start() {
        let createdDate = generateDate();
        let query = new BuildQuery().execute();
        return new QueryDispatcher(this.editionUrl, createdDate, this.magazineId, query).execute()
        //Here is the email logic
    }
}