export default class MagazineIndexOf {
    constructor(
        private indexOf: string
    ) { }

    execute() {
        return this.indexOf.trim() !== "";
    }
}