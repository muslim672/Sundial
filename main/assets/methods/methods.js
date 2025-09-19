let prayerMethod;
let prayerIndex = localStorage.getItem('prayerIndex');
if (prayerIndex) {
    prayerMethod = prayerMethods[parseInt(prayerIndex)];
} else {
    prayerMethod = prayerMethods[1];
}

let fajrAngle, ishaAngle;
let prayerMethodEl = document.getElementById('prayerMethod');
let fajrEl = document.getElementById('fajr');
let ishaEl = document.getElementById('isha');
let prayerMethodsBtnEl = document.getElementById('prayerMethodsBtn');
let prayerMethodsEl = document.getElementById('prayerMethods');

[fajrAngle, ishaAngle] = [prayerMethod.fajrAngle, prayerMethod.ishaAngle];
prayerMethodEl.textContent = `حساب الفجر والعشاء: ${prayerMethod.nameAr}`;
fajrEl.textContent = `زاوية الفجر: ${prayerMethod.fajrAngle}`;
ishaEl.textContent = `زاوية العشاء: ${prayerMethod.ishaAngle}`;
prayerMethodsBtnEl.textContent = prayerMethod.nameAr;

prayerMethods.forEach((prayerMethod, index) => {
    let btnEl = document.createElement('button');
    btnEl.className = 'dropdown-item';
    btnEl.textContent = prayerMethod.nameAr;
    btnEl.onclick = () => {
        [fajrAngle, ishaAngle] = [prayerMethod.fajrAngle, prayerMethod.ishaAngle];
        prayerMethodEl.textContent = `حساب الفجر والعشاء: ${prayerMethod.nameAr}`;
        fajrEl.textContent = `زاوية الفجر: ${prayerMethod.fajrAngle}`;
        ishaEl.textContent = `زاوية العشاء: ${prayerMethod.ishaAngle}`;
        prayerMethodsBtnEl.textContent = prayerMethod.nameAr;
        localStorage.setItem('prayerIndex', index);
    }
    prayerMethodsEl.appendChild(btnEl);
});
