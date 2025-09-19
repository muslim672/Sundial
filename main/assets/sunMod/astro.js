function jd(stamp = new Date()) {
    return stamp.getTime() / 86400000 + 2440587.5;
}

function jd_(JD = jd()) {
    return new Date((JD - 2440587.5) * 86400000);
}

function delta_t(stamp = new Date()) {
    let year = stamp.getFullYear();
    let month = stamp.getMonth() + 1;
    let y = year + (month - 0.5) / 12;
    if (year < 1986) {
        let t = y - 1975;
        return 45.45 + 1.067 * t - t**2 / 260 - t**3 / 718;
    }
    if (year < 2005) {
        let t = y - 2000;
        return 63.86 + 0.3345 * t - 0.060374 * t**2 + 0.0017275 * t**3 + 0.000651814 * t**4 + 0.00002373599 * t**5;
    }
    if (year < 2050) {
        let t = y - 2000;
        return 62.92 + 0.32217 * t + 0.005589 * t**2;
    }
    if (year < 2150) {
        return -20 + 32 * ((y - 1820) / 100)**2 - 0.5628 * (2150 - y);
    }
    let u = (y - 1820) / 100;
    return -20 + 32 * u**2;
}

function astro(stamp = new Date()) {
    let JD = jd(stamp);
    let ΔT = delta_t(stamp);
    let JDE = JD + ΔT / 86400;
    let JC = (JD - 2451545) / 36525;
    let JCE = (JDE - 2451545) / 36525;
    let D = 297.850360 + 445267.111480 * JCE - 0.0019142 * JCE**2 + JCE**3 / 189474;
    let M = 357.527720 + 35999.0503400 * JCE - 0.0001603 * JCE**2 - JCE**3 / 300000;
    let M_ = 134.96298 + 477198.867398 * JCE + 0.0086972 * JCE**2 + JCE**3 / 56250;
    let F = 93.2719100 + 483202.017538 * JCE - 0.0036825 * JCE**2 + JCE**3 / 327270;
    let Ω = 125.044520 - 1934.13626100 * JCE + 0.0020708 * JCE**2 + JCE**3 / 450000;
    let X = [D, M, M_, F, Ω];
    let Δψ = 0;
    let Δε = 0;
    for (let i = 0; i < Y.length; i++) {
        let sm = 0;
        for (let j = 0; j < X.length; j++) {
            sm += X[j] * Y[i][j];
        }
        Δψ += (ABCD[i][0] + ABCD[i][1] * JCE) * sin_r(sm);
        Δε += (ABCD[i][2] + ABCD[i][3] * JCE) * cos_r(sm);
    }
    Δψ /= 36e6;
    Δε /= 36e6;
    let U = JCE / 100;
    let ε0 = 84381.448 - 4680.93 * U - 1.55 * U**2 + 1999.25 * U**3 - 51.38 * U**4 - 249.67 * U**5 - 39.05 * U**6 + 7.12 * U**7 + 27.87 * U**8 + 5.79 * U**9 + 2.45 * U**10;
    let ε = Δε + ε0 / 3600;
    let z = 360.98564736629 * 36525;
    let ν0 = 280.46061837 + z * JC + 0.000387933 * JC**2 - JC**3 / 38710000;
    let ν = ν0 + Δψ * cos_r(ε);
    return [Δψ, ε, ν];
}

function angles_(body, stamp = new Date()) {
    let JD = jd(stamp);
    let ΔT = delta_t(stamp);
    let [Δψ, ε, ν] = astro(stamp);
    let JDE = JD + ΔT / 86400;
    let λ, β, Δ, π, h0;
    if (body === 'sun') {
        let JME = (JDE - 2451545) / 365250;
        function LBR(JME, tup) {
            let lst = [];
            for (let arr of tup) {
                let sm = 0;
                for (let row of arr) {
                    sm += row[0] * Math.cos(row[1] + row[2] * JME);
                }
                lst.push(sm);
            }
            return lst;
        }
        let L = [L0, L1, L2, L3, L4, L5];
        let B = [B0, B1];
        let R = [R0, R1, R2, R3, R4];
        [L, B, R] = [L, B, R].map(v => poly(JME, LBR(JME, v)) / 1e8);
        [L, B] = [L, B].map(v => degrees(v));
        let θ = L + 180;
        let Δτ = -20.4898 / (3600 * R);
        λ = θ + Δψ + Δτ;
        β = -B;
        Δ = R * 149597870.7;
        π = 8.794 / (3600 * R);
        h0 = -0.8333;
        let r = 696340;
    } else if (body === 'moon') {
        let T = (JDE - 2451545) / 36525;
        let L_ = 218.3164477 + 481267.88123421 * T - 0.0015786 * T**2 + T**3 / 538841 - T**4 / 65194000;
        let D = 297.85019210 + 445267.11140340 * T - 0.0018819 * T**2 + T**3 / 545868 - T**4 / 113065000;
        let M = 357.52910920 + 35999.050290900 * T - 0.0001536 * T**2 + T**3 / 24490000;
        let M_ = 134.9633964 + 477198.86750550 * T + 0.0087414 * T**2 + T**3 / 69699.0 - T**4 / 14712000;
        let F = 93.272095000 + 483202.01752330 * T - 0.0036539 * T**2 - T**3 / 3526000 + T**4 / 863310000;
        let E = 1 - 0.002516 * T - 0.0000074 * T**2;
        let A1 = 119.75 + 131.849 * T;
        let A2 = 53.09 + 479264.29 * T;
        let A3 = 313.45 + 481266.484 * T;
        let L = 0, B = 0, R = 0;
        for (let i = 0; i < T1.length; i++) {
            L += E**Math.abs(T1[i][1]) * T1[i][4] * sin_r(T1[i][0] * D + T1[i][1] * M + T1[i][2] * M_ + T1[i][3] * F);
            B += E**Math.abs(T2[i][1]) * T2[i][4] * sin_r(T2[i][0] * D + T2[i][1] * M + T2[i][2] * M_ + T2[i][3] * F);
            R += E**Math.abs(T1[i][1]) * T1[i][5] * cos_r(T1[i][0] * D + T1[i][1] * M + T1[i][2] * M_ + T1[i][3] * F);
        }
        L += 3958 * sin_r(A1) + 1962 * sin_r(L_ - F) + 318 * sin_r(A2);
        B += -2235 * sin_r(L_) + 382 * sin_r(A3) + 175 * sin_r(A1 - F) + 175 * sin_r(A1 + F) + 127 * sin_r(L_ - M_) - 115 * sin_r(L_ + M_);
        let λ_ = L_ + L / 1e6;
        λ = λ_ + Δψ;
        β = B / 1e6;
        Δ = 385000.56 + R / 1000;
        π = asin_d(6378.137 / Δ);
        h0 = 0.7275 * π - 0.5667;
        let r = 1737.4;
    }
    let α = atan2_d(sin_r(λ) * cos_r(ε) - tan_r(β) * sin_r(ε), cos_r(λ));
    let δ = asin_d(sin_r(β) * cos_r(ε) + cos_r(β) * sin_r(ε) * sin_r(λ));
    let H0 = α - ν;
    return [α, δ, H0, h0, π, λ, Δ];
}

function angles(body, lat, long, stamp = new Date) {
    let [α, δ, H0, h0, π] = angles_(body, stamp).slice(0, 5);
    let H = long - H0;
    if (lat === null) {
        return H;
    }
    let equatorial = 6378137;
    let polar = 6356752.3142;
    let f_ = polar / equatorial;
    let u = atan_d(f_ * tan_r(lat));
    let x = cos_r(u);
    let y = sin_r(u) * f_;
    let Δα = atan2_d(-x * sin_r(π) * sin_r(H), cos_r(δ) - x * sin_r(π) * cos_r(H));
    let α_ = α + Δα;
    let δ_ = atan2_d((sin_r(δ) - y * sin_r(π)) * cos_r(Δα), cos_r(δ) - x * sin_r(π) * cos_r(H));
    let H_ = H - Δα;
    let e0 = asin_d(sin_r(lat) * sin_r(δ_) + cos_r(lat) * cos_r(δ_) * cos_r(H_));
    let Δe = 1.02 / (60 * tan_r(e0 + 10.3 / (e0 + 5.11)));
    if (e0 < h0) {
        Δe = 0;
    }
    let e = e0 + Δe;
    let Γ = atan2_d(sin_r(H_), cos_r(H_) * sin_r(lat) - tan_r(δ_) * cos_r(lat));
    let Φ = Γ + 180;
    return [e, Φ, H];
}
