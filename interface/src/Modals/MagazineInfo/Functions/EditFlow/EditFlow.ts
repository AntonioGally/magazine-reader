import { newMagazinePayload } from "../../../NewMagazine/newMagazine.types";
import authHttp from "../../../../scripts/authHttp";

export default class EditFlow {
    constructor(
        private payload: newMagazinePayload,
        private magazineId: string
    ) { }

    start() {
        return authHttp.put(`/magazine?magazineId=${this.magazineId}`, this.payload)
    }
}