export default class BuildQuery {

    execute() {
        return `
        SELECT * FROM editions WHERE editionMagazine = $1
        `
    }
}