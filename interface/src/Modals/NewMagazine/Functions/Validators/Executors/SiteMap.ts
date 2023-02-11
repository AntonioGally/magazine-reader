export default class SiteMap {
    constructor(
        private siteMap: string
    ) { }

    execute() {
        if (!(typeof this.siteMap == "string" && this.siteMap.trim().length > 10)) {
            return {
                errorCause: "O link do siteMap é obrigatório",
                error: true
            }
        }
        return {
            errorCause: undefined,
            error: false
        }
    }
}