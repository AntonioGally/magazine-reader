//Libs
import axios from "axios";
import { load } from "cheerio";
const cheerio = require("cheerio");

export default class SiteMapReader {
    constructor(
        private url: string,
        private _indexOf: string
    ) { }

    async start() {
        const filteredLinks: string[] = [];

        return new Promise<string[]>((resolve, reject) => {
            axios.get(this.url)
                .then((data) => {
                    const xml = data.data;
                    const $ = load(xml, {
                        xmlMode: true
                    });

                    $("loc").each((i, el) => {
                        let text = $(el).text();
                        if (text.indexOf(this._indexOf) > -1) {
                            filteredLinks.push(text)
                        }
                    });

                    resolve(filteredLinks)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}