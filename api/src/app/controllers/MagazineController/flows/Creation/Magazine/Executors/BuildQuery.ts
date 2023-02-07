
export default class BuildQuery {

    execute(): string {
        return `
        INSERT INTO magazines
        (magazineName, magazineDescription, magazineImage, magazineUrl, magazineCreatedDate, magazineCreatedBy, magazineSiteMap, magazineIndexOf)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `;
    }
}