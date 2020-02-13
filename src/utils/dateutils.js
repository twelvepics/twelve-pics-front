const timeSince = (from_ts) => {
    const todate = new Date();
    const fromdate = new Date(from_ts * 1000)
    const diff = todate - fromdate;
    const divideBy = [
        ['year', 31536000000],
        ['month', 2678400000],
        ['week', 604800000],
        ['day', 86400000],
        ['hour', 3600000],
        ['minute', 60000]];

    let rez;
    let found = false;
    for (let unit of divideBy) {
        rez = [unit[0], Math.floor(diff / unit[1])];
        if (rez[1] !== 0) {
            found = true;
            break;
        }
    }
    if (found) {
        return `${rez[1]} ${rez[0]}${rez[1] > 1 ? 's' : ''} ago`;
    }
    return 'now';
}

module.exports = { timeSince }