import { IValidator } from "../IValidator";

export default class MagazineDescription implements IValidator {
    constructor(
        private description: string
    ) { }

    execute() {
        return this.description.trim() !== "";
    }
}