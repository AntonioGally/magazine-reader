export default class Image {
    constructor(
        private image: string
    ) { }

    execute() {
        if (!(typeof this.image == "string" && this.image.trim().length > 7)) {
            return {
                errorCause: "O url da imagem é obrigatório",
                error: true
            }
        }
        return {
            errorCause: undefined,
            error: false
        }
    }
}