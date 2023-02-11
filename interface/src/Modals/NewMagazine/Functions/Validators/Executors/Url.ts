export default class Url {
    constructor(
        private url: string
    ) { }

    execute() {
        if (!(typeof this.url == "string" && this.url.trim().length > 10)) {
            return {
                errorCause: "O Url da revista é obrigatório",
                error: true
            }
        }
        return {
            errorCause: undefined,
            error: false
        }
    }
}