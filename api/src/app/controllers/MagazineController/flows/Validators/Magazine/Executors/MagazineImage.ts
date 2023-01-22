export default class MagazineImage {
    constructor(
        private image: string
    ) { }

    execute() {
        return this.image.trim() !== "";
    }
}