import { IValidator } from "../../../../../../types/general.types";
import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";

export default class ValidatorsArray {
    constructor(
        private validatorsArray: IValidator[],
        private email: string,
        private password: string
    ) { }

    execute() {
        this.validatorsArray.push(new LoginEmail(this.email));
        this.validatorsArray.push(new LoginPassword(this.password));
    }
}