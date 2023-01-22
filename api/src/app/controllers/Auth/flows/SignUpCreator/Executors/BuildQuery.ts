export default class BuildQuery {
    constructor() { }

    execute() {
        return `
        INSERT INTO users
        (userName, userLastName, userEmail, userPassword, userCreationDate)
        VALUES ($1, $2, $3, crypt($4, gen_salt('bf')), $5)
        RETURNING *
        `
    }
}