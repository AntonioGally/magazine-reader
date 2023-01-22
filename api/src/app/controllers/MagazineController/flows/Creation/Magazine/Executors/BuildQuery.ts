import { storePayload } from "../../../../magazine.types";

export default class BuildQuery {

    execute(): string {
        return `
        INSERT INTO magazine 
        (magazineName, magazineDescription, magazineImage, magazineUrl, magazineCreatedDate, magazineCreatedBy)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `;
    }
}