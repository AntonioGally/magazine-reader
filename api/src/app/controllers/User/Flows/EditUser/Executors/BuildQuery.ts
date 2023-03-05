export default class BuildQuery {
    execute() {
        return `
        UPDATE users 
        SET
            userName = $1, userLastName = $2, userEmail = $3, userPassword = $4
        WHERE
            userId = $5
        `
    }
}