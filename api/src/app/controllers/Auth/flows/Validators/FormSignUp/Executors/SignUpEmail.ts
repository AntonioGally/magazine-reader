export default class SignUpEmail {
    constructor(
        private email: string
    ) { }

    execute(): boolean {
        if (typeof this.email !== "string" || this.email.trim() === "") return false;
        return true;
    }
}