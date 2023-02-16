export default class BuildQuery {

    execute() {
        return `
        UPDATE magazines SET 
            magazineName = $1, magazineDescription = $2, magazineImage = $3,
            magazineUrl = $4, magazineSiteMap = $5, magazineIndexOf = $6
        WHERE magazineId = $7 AND magazineCreatedBy = $8
        RETURNING *;
        `
    }
}