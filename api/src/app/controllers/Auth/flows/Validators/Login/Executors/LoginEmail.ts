export default class LoginEmail {
    constructor (
        private email: string
    ) {}

    execute() {
        if (typeof this.email !== "string" || this.email.trim() === "") return false;
        return true;
    }
}