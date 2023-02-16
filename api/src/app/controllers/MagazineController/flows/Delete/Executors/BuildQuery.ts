export default class BuildQuery {

    execute() {
        return `
        DELETE FROM magazines
        WHERE magazineId = $1 AND magazineCreatedBy = $2
        RETURNING *;
        `
    }
}