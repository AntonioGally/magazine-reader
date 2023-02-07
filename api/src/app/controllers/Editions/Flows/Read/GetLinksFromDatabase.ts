import { query } from "../../../../database"

export default class GetLinksFromDatabase {
    constructor(
        private editionURL: string,
    ) { }

    excute() {
        return new Promise<unknown[]>((resolve, reject) => {
            query(`SELECT * FROM editions WHERE editionUrl = $1`, [this.editionURL])
                .then(resolve)
                .catch(reject);
        })
    }
}