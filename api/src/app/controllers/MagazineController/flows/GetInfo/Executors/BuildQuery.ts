export default class BuildQuery {
    execute() {
        return `
        SELECT * FROM magazines WHERE magazineId = $1 AND magazineCreatedBy = $2;
        `
    }
}