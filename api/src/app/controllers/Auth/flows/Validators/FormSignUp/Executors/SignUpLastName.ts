export default class SignUpLastName {
    constructor(
        private lastName: string
    ) { }

    execute(): boolean {
        if (typeof this.lastName !== "string" || this.lastName.trim() === "") return false;
        return true;
    }
}