export default class LoginPassword {
    constructor (
        private password: string
    ) {}

    execute() {
        if (typeof this.password !== "string" || this.password.trim() === "") return false;
        return true;
    }
}