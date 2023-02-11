//Validators
import Title from "./Title";
//Types
import { IValidator } from "../../../../../@types/magazine";
import { newMagazinePayload } from "../../../newMagazine.types";
import Description from "./Description";
import Image from "./Image";
import Url from "./Url";
import SiteMap from "./SiteMap";
import IndexOf from "./IndexOf";

export default class ValidatorsArray {
    constructor(
        private payload: newMagazinePayload,
        private validatorsArray: IValidator[]
    ) { }

    execute() {
        this.validatorsArray.push(new Title(this.payload.name));
        this.validatorsArray.push(new Description(this.payload.description));
        this.validatorsArray.push(new Image(this.payload.image));
        this.validatorsArray.push(new Url(this.payload.url));
        this.validatorsArray.push(new SiteMap(this.payload.siteMap));
        this.validatorsArray.push(new IndexOf(this.payload._indexOf));
    }
}