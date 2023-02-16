export default class BuildQuery {

    execute() {
        return `
        DELETE FROM editions
        WHERE editionMagazine = $1;
        `
    }
}