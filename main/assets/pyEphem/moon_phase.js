function moonPhase(target, stamp = new Date()) {
    function f(JD) {
        let stamp_ = jd_(JD);
        let λ_m = angles_('moon', stamp_)[5];
        let λ_s = angles_('sun', stamp_)[5];
        let elon = λ_m - λ_s;
        return norm(target - elon);
    }
    let JD = jd(stamp);
    let diff = mod(f(JD));
    if (diff < finit) {
        diff += 360;
    }
    let JD_ = JD + 29.53 * diff / 360;
    return jd_(newton(f, JD_));
}

function moon_phase(stamp = new Date(), P = 'N') {
    switch (P) {
        case 'N':;
            return moonPhase(0, stamp);
        case 'Q1':;
            return moonPhase(90, stamp);
        case 'F':;
            return moonPhase(180, stamp);
        case 'Q2':;
            return moonPhase(270, stamp);
    }
}
