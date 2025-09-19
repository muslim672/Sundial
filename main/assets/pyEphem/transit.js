function transit(body, target, long, stamp = new Date()) {
    function f(JD) {
        let stamp_ = jd_(JD);
        let H = angles(body, null, long, stamp_);
        return norm(target - H);
    }
    let JD = jd(stamp);
    let diff = mod(f(JD));
    if (diff < finit) {
        diff += 360;
    }
    let JD_ = JD + diff / 360;
    return jd_(newton(f, JD_));
}
