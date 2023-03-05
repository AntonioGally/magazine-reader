export default class BuildQuery {

    execute() {
        return `
        UPDATE magazines SET 
            magazineName = $1, magazineDescription = $2, magazineImage = $3,
            magazineUrl = $4, magazineSiteMap = $5, magazineIndexOf = $6, 
            magazineUpdatePeriod = $7
        WHERE magazineId = $8 AND magazineCreatedBy = $9
        RETURNING *;
        `
    }
}