export default class BuildQuery {
    execute() {
        return `
        SELECT ed.editionUrl, ed.editionCreatedDate, mg.magazineName, mg.magazineUrl
        FROM editions as ed 
            INNER JOIN magazines as mg
            ON ed.editionMagazine = mg.magazineId
        WHERE mg.magazineCreatedBy = $1;
        `
    }
}