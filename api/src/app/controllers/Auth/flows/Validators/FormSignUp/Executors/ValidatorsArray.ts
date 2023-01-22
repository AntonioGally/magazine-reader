import { IValidator } from "../../../../../../types/general.types";
import { SignUpPayload } from "../../../../auth.types";
import SignUpEmail from "./SignUpEmail";
import SignUpLastName from "./SignUpLastName";
import SignUpName from "./SignUpName";
import SignUpPassword from "./SignUpPassword";

export default class ValidatorsArray {
    constructor(
        private validatorsArray: IValidator[],
        private signUpPayload: SignUpPayload
    ) { }

    execute() {
        this.validatorsArray.push(new SignUpName(this.signUpPayload.name));
        this.validatorsArray.push(new SignUpLastName(this.signUpPayload.lastName));
        this.validatorsArray.push(new SignUpEmail(this.signUpPayload.email));
        this.validatorsArray.push(new SignUpPassword(this.signUpPayload.password));
    }
}