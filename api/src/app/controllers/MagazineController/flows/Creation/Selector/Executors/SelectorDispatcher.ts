import { query } from "../../../../../../database";
import { storeSelectorPayload } from "../../../../magazine.types";

export default class SelectorDispatcher {
    constructor (
        private selectorPayload: storeSelectorPayload,
        private query: string,
    ) {}

    execute() {
        return query(this.query, [
            this.selectorPayload.name,
            this.selectorPayload.siteMapUrl,
            this.selectorPayload.searchFor,
            this.selectorPayload.magazineId
        ]);
    }
}