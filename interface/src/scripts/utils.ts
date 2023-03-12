export function generateDate() {
    var date = new Date();
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    var month =
        date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function getFormattedDate(_date: string) {
    var date = new Date(_date);
    let finalDate = {
        day: "", month: "", year: "", hour: "", minutes: ""
    }
    //Day
    var day = date.getDate();
    if (day < 10) finalDate.day = `0${day}`
    else finalDate.day = String(day);
    //Month
    var month = date.getMonth() + 1;
    if (month < 10) finalDate.month = `0${month}`
    else finalDate.month = String(month);
    //Year
    var year = date.getFullYear();
    finalDate.year = String(year);
    //Hour
    var hour = date.getHours();
    if (hour < 10) finalDate.hour = `0${hour}`
    else finalDate.hour = String(hour);
    //Minutes
    var minutes = date.getMinutes();
    if (minutes < 10) finalDate.minutes = `0${minutes}`
    else finalDate.minutes = String(minutes);

    return {
        dateString: `${finalDate.day}/${finalDate.month}/${finalDate.year} ${finalDate.hour}:${finalDate.minutes}`,
        dateObject: finalDate
    }
}

export function sliceIntoChunks(arr: any[], chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export function getMagazineUpdatePeriods() {
    return [
        { label: "Diário", value: "daily" },
        { label: "Semanal", value: "weekly" },
        { label: "Mensal", value: "monthly" },
        { label: "Bimensal", value: "bimontly" },
        { label: "Trimestral", value: "quaterly" },
        { label: "Semestral", value: "semesterly" },
        { label: "Anualmente", value: "annually" },
    ]
}

//https://stackoverflow.com/a/30633703
export function getPath(url: string, defaults: string = "unknown") {
    var reUrlPath = /(?:\w+:)?\/\/[^\/]+([^?#]+)/;
    var urlParts = url.match(reUrlPath) || [url, defaults];
    return urlParts.pop();
}