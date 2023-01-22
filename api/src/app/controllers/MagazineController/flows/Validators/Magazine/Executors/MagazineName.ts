export default class MagazineName {
    constructor(
        private magazineName: string
    ) { }

    execute() {
        return this.magazineName.trim() !== "";
    }
}