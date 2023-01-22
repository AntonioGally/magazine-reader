export default class MagazineUrl {
    constructor(
        private url: string
    ) { }

    execute() {
        return this.url.trim() !== "";
    }
}