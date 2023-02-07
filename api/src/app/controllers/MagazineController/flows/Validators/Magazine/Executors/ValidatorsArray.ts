//Types
import { storePayload } from "../../../../magazine.types";
import { IValidator } from "../../../../../../types/general.types";
//Executors
import MagazineDescription from "./MagazineDescription";
import MagazineImage from "./MagazineImage";
import MagazineName from "./MagazineName";
import MagazineUrl from "./MagazineUrl";
import MagazineSiteMap from "./MagazineSiteMap";
import MagazineIndexOf from "./MagazineIndexOf";

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
        this.validatorsArray.push(new MagazineSiteMap(this.payload.information.siteMap));
        this.validatorsArray.push(new MagazineIndexOf(this.payload.information.indexOf));
    }
}