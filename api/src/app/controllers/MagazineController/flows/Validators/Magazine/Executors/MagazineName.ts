import { IValidator } from "../IValidator";

export default class MagazineName implements IValidator {
    constructor(
        private magazineName: string
    ) { }

    execute() {
        return this.magazineName.trim() !== "";
    }
}