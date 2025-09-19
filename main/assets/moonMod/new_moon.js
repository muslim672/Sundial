function new_moon(lat, long, stamp = new Date()) {
    let [istitlaa, newMoon, maghrib, moonset] = istitla(lat, long, stamp);
    let o_time = new Date(maghrib.getTime() + 4 / 9 * (moonset.getTime() - maghrib.getTime()));
    let visib = isVisible(lat, long, o_time);

    let n = 29.53;
    let N = 65970;
    let y = Math.round(jd(newMoon) / n) - N;
    let year = Math.floor(y / 12);
    let month = mod(y, 12);

    return [year, month + 1, visib, istitlaa, newMoon, maghrib, moonset, o_time];
}
