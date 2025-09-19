function rise_set(body, target, isSet, lat, long, stamp = new Date(), elev = 0) {
    function f(JD) {
        let stamp_ = jd_(JD);
        let e = angles(body, lat, long, stamp_)[0];
        return norm(target - e);
    }
    let JD = jd(stamp);
    let [δ, H0, h0] = angles_(body, stamp).slice(1, 4);
    let H = long - H0;
    if (target === 'h0') {
        let r = 6371008.7714;
        let dip = acos_d(r / (r + Math.abs(elev)));
        if (elev < 0) {
            dip *= -1;
        }
        target = h0 - dip;
    }
    let target_H_ = acos_d((sin_r(target) - sin_r(lat) * sin_r(δ)) / (cos_r(lat) * cos_r(δ)));
    let target_H = isSet * target_H_;
    let diff = mod(target_H - H);
    if (diff < finit) {
        diff += 360;
    }
    let JD_ = JD + diff / 360;
    return jd_(newton(f, JD_));
}
