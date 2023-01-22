export default class SignUpPassword {
    constructor(
        private password: string
    ) { }

    execute(): boolean {
        if (typeof this.password !== "string" || this.password.trim() === "") return false;
        return true;
    }
}