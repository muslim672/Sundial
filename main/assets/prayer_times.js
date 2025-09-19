function prayer_times(lat, long, stamp = new Date(), elev) {
    if (isNaN(elev)) {
        elev = 0;
    }
    let [shurooq, maghrib] = riset('sun', 'h0', lat, long, stamp, elev);
    let fajr = riset('sun', -fajrAngle, lat, long, stamp)[0];
    let isha = riset('sun', -ishaAngle, lat, long, stamp)[1];
    let [dhuhr, muntasaf] = transit_nadir('sun', long, stamp);
    let dhuhr_angle = angles('sun', lat, long, dhuhr)[0];
    let x = 1;
    let asr_angle = atan2_d(tan_r(dhuhr_angle), 1 + x * tan_r(dhuhr_angle));
    let asr = riset('sun', asr_angle, lat, long, stamp)[1];
    return [fajr, shurooq, dhuhr, asr, maghrib, isha, muntasaf];
}

let names = ['الفجر', 'الشروق', 'الظهر', 'العصر', 'المغرب', 'العشاء', 'منتصف الليل'];
