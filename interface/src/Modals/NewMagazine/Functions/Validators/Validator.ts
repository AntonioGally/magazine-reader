//Libs
import { toast } from "react-toastify";
//Types
import { IValidator } from "../../../../@types/magazine";
import { newMagazinePayload } from "../../newMagazine.types";
import ValidatorsArray from "./Executors/ValidatorsArray";

export default class Validator {
    constructor(
        private payload: newMagazinePayload
    ) { }


    validatorsArray: IValidator[] = [];


    start() {
        let validation: { error: boolean, errorCause: string | undefined } = { error: false, errorCause: undefined };
        new ValidatorsArray(this.payload, this.validatorsArray).execute();
        for (let i = 0; i < this.validatorsArray.length; i++) {
            validation = this.validatorsArray[i].execute();
            if (!validation.error) {
                toast.error(validation.errorCause);
                return validation;
            }
        }

        return validation;
    }
}