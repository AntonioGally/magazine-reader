import authHttp from "../../../../scripts/authHttp";

export default class DeleteFlow {
    constructor(
        private magazineId: string
    ) { }

    start() {
        return authHttp.delete(`/magazine?magazineId=${this.magazineId}`)
    }
}