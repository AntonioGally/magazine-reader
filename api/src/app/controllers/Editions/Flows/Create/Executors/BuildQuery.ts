export default class BuildQuery {

    execute() {
        return `
        INSERT INTO editions
        (editionUrl, editionCreatedDate, editionMagazine)
        VALUES ($1, $2, $3)
        RETURNING *
        `
    }
}