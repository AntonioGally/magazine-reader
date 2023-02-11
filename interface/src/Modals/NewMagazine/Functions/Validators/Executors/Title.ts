export default class Title {
    constructor(
        private title: string
    ) { }

    execute() {
        if (!(typeof this.title == "string" && this.title.trim().length > 2)) {
            return {
                errorCause: "O nome da revista precisa ter mais de 2 caracteres",
                error: true
            }
        }
        return {
            errorCause: undefined,
            error: false
        }
    }
}