export function generateDate() {
    var date = new Date();
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    var month =
        date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
