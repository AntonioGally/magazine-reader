export default class BuildQuery {

    execute() {
        return `
        INSERT INTO selectors
        (selectorName, selectorSiteMap, selectorIndexOf, selectorMagazine)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `
    }
}