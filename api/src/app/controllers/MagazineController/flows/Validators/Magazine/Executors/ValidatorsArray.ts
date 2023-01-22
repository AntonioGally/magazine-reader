//Types
import { storePayload } from "../../../../magazine.types";
import { IValidator } from "../IValidator";
//Executors
import MagazineDescription from "./MagazineDescription";
import MagazineImage from "./MagazineImage";
import MagazineName from "./MagazineName";
import MagazineUrl from "./MagazineUrl";

export default class ValidatorsArray {
    constructor(
        private payload: storePayload,
        private validatorsArray: IValidator[]
    ) { }

    execute() {
        this.validatorsArray.push(new MagazineName(this.payload.information.name));
        this.validatorsArray.push(new MagazineDescription(this.payload.information.description));
        this.validatorsArray.push(new MagazineImage(this.payload.information.image));
        this.validatorsArray.push(new MagazineUrl(this.payload.information.url));
    }
}