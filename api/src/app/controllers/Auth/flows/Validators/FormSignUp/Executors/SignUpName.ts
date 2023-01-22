export default class SignUpName {
    constructor(
        private name: string
    ) { }

    execute(): boolean {
        if (typeof this.name !== "string" || this.name.trim() === "") return false;
        return true;
    }
}