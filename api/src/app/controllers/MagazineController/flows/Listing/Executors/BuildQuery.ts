export default class BuildQuery {
    execute() {
        return `
        SELECT * FROM magazines WHERE magazineCreatedBy = $1;
        `
    }
}