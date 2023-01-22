//Types
import { storePayload } from "../../../magazine.types";
import { IValidator } from "./IValidator";
//Executor
import ValidatorsArray from "./Executors/ValidatorsArray";

export default class StoreValidator {
    constructor(
        private payload: storePayload
    ) { }

    validatorsArray!: IValidator[];

    start() {
        let validation = false;
        new ValidatorsArray(this.payload, this.validatorsArray).execute();
        for (let i = 0; i < this.validatorsArray.length; i++) {
            validation = this.validatorsArray[i].execute();
            if (!validation) return;
        }
        return validation;
    }
}