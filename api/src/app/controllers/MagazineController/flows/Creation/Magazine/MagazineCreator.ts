import { storePayload } from "../../../magazine.types";
import BuildQuery from "./Executors/BuildQuery";

export default class MagazineCreator {
    constructor(
        private magazineInfo: storePayload["information"]
    ) { }
    
    start() {
        let query = new BuildQuery().execute();
        
    }
}