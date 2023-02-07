export default class MagazineSiteMap {
    constructor(
        private siteMap: string
    ) { }

    execute() {
        return this.siteMap.trim() !== "";
    }
}