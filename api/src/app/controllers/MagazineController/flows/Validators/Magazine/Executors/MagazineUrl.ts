import { IValidator } from "../IValidator";

export default class MagazineUrl implements IValidator {
    constructor(
        private url: string
    ) { }

    execute() {
        return this.url.trim() !== "";
    }
}