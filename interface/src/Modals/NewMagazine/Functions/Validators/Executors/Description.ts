export default class Description {
    constructor(
        private description: string
    ) { }

    execute() {
        if (!(typeof this.description == "string" && this.description.trim().length > 0)) {
            return {
                errorCause: "A descrição é obrigatória",
                error: true
            }
        }
        return {
            errorCause: undefined,
            error: false
        }
    }
}