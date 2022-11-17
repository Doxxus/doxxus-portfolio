import { Elements } from './elements';
import * as info from '../json/info.json';

interface language {
    name: string,
    proficiency: number
}

let timingValue: number;

export function deployLanguages(event: Event) {
    if (!Elements.eleLanguages.classList.contains('expand')) {
        Elements.langProfs.innerHTML = "";

        timingValue = 0;
        info.languages.forEach(generateLanguage)
    }
}

function generateLanguage(lang: language) {
    timingValue += 50;
    
    let langName: HTMLSpanElement = document.createElement("span");
    langName.textContent = lang.name;
    langName.classList.add('lang_base');

    let langProf: HTMLDivElement = document.createElement("div");
    langProf.classList.add('lang_prof_base');
    langProf.id = lang.name;

    langProf.appendChild(langName);

    Elements.langProfs.appendChild(langProf);

    setTimeout(() => {
        langName.style.opacity = '100';
        langProf.style.width = lang.proficiency + "%";
    }, timingValue);
}