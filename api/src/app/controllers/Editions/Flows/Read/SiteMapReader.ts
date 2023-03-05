//Libs
import axios from "axios";
import { load } from "cheerio";
import { magazineInfoType } from "../../editions.types";

export default class SiteMapReader {
    constructor(
        private magazineInfo: magazineInfoType
    ) { }

    async start() {


        return new Promise<string[]>((resolve, reject) => {
            axios.get(this.magazineInfo.magazinesitemap)
                .then((data) => {

                    if (this.magazineInfo.magazinesitemapexists) {
                        let filteredLinks = new Set<string>("")
                        const xml = data.data;
                        const $ = load(xml, {
                            xmlMode: true
                        });

                        $("loc").each((i, el) => {
                            let text = $(el).text();
                            if (text.indexOf(this.magazineInfo.magazineindexof) > -1) {
                                filteredLinks.add(text);
                            }
                        });

                        resolve([...filteredLinks])
                    } else {
                        let filteredLinks = new Set<string>("")
                        const html = data.data;
                        const $ = load(html);
                        $("a").each((i, el) => {
                            let text = $(el).attr()["href"];
                            if (text?.indexOf(this.magazineInfo.magazineindexof) > -1) {
                                // console.log(text)
                                filteredLinks.add(text);
                            }
                        })
                        resolve([...filteredLinks]);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}