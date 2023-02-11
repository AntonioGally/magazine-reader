export default class IndexOf {
    constructor(
        private _indexOf: string
    ) { }

    execute() {
        if (!(typeof this._indexOf == "string" && this._indexOf.trim().length > 2)) {
            return {
                errorCause: "A frase para pesquisa é obrigatória",
                error: true
            }
        }
        return {
            errorCause: undefined,
            error: false
        }
    }
}