import { newMagazinePayload } from "../../newMagazine.types";
import authHttp from "../../../../scripts/authHttp";

export default class CreateFlow {
    constructor(
        private payload: newMagazinePayload
    ) { }

    async execute() {
        return authHttp.post("/magazine", { information: this.payload })
    }
}