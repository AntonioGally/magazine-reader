export default class BuildQuery {
    execute() {
        return `
        SELECT * FROM users WHERE userId = $1;
        `
    }
}