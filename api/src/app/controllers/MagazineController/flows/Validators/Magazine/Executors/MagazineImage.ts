import { IValidator } from "../IValidator";

export default class MagazineImage implements IValidator {
    constructor(
        private image: string
    ) { }

    execute() {
        return this.image.trim() !== "";
    }
}