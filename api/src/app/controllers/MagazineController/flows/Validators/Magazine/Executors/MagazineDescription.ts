export default class MagazineDescription {
    constructor(
        private description: string
    ) { }

    execute() {
        return this.description.trim() !== "";
    }
}