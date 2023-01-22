import { IValidator } from "../../../../../types/general.types";
import ValidatorsArray from "./Executors/ValidatorsArray";

export default class LoginValidator {
    constructor(
        private email: string,
        private password: string,
    ) { }

    validatorsArray: IValidator[] = [];

    start(): boolean {
        let validation: boolean = false;
        new ValidatorsArray(this.validatorsArray, this.email, this.password).execute();
        for (let i = 0; i < this.validatorsArray.length; i++) {
            validation = this.validatorsArray[i].execute();
            if (!validation) return;
        }
        return validation;
    }
}