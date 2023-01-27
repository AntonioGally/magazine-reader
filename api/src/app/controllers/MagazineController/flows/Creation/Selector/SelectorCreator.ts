import { storeSelectorPayload } from "../../../magazine.types";
import BuildQuery from "./Executors/BuildQuery";
import SelectorDispatcher from "./Executors/SelectorDispatcher";

export default class SelectorCreator {
    constructor (
        private selectorPayload: storeSelectorPayload
    ) {}

    start() {
        let query = new BuildQuery().execute();
        return new SelectorDispatcher(this.selectorPayload, query).execute();
    }
}