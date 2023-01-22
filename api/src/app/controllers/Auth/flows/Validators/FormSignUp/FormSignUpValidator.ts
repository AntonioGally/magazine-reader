import { IValidator } from "../../../../../types/general.types";
import { SignUpPayload } from "../../../auth.types";
import ValidatorsArray from "./Executors/ValidatorsArray";

export default class FormSignUpValidator {
    constructor(
        private sigUpPayload: SignUpPayload
    ) { }

    validatorsArray: IValidator[] = [];

    start() {
        let validation: boolean = false;
        new ValidatorsArray(this.validatorsArray, this.sigUpPayload).execute();
        for (let i = 0; i < this.validatorsArray.length; i++) {
            validation = this.validatorsArray[i].execute();
            if (!validation) return;
        }
        return validation;
    }
}