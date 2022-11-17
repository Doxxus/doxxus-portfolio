import { Elements } from './elements';
import * as info from '../json/info.json';

interface framework {

}

interface language {
    name: string,
    proficiency: number,
    about: string,
    frameworks: Array<framework>
}

let timingValue: number;
let numLangs: number;

export function deployLanguages(event: Event) {
    if (!Elements.eleLanguages.classList.contains('expand')) {
        Elements.langProfs.innerHTML = "";

        timingValue = 0;
        numLangs = 0;
        info.languages.forEach(generateLanguage);
    }
}

function generateLanguage(lang: language) {
    timingValue += 50;
    
    let langName: HTMLSpanElement = document.createElement("span");
    langName.textContent = lang.name;
    langName.id = lang.name + '_title';
    langName.classList.add('lang_base');

    let langProf: HTMLDivElement = document.createElement("div");
    langProf.classList.add('lang_prof_base');
    langProf.id = lang.name;
    langProf.onclick = expandLanguage;
    langProf.style.top = numLangs * 35 + 50 + "px";

    langProf.appendChild(langName);

    Elements.langProfs.appendChild(langProf);

    setTimeout(() => {
        langName.style.opacity = '100';
        langProf.style.width = lang.proficiency * 0.95 + "%";
    }, timingValue);

    numLangs += 1;
}

function expandLanguage(event: Event) {
    
    let lang: HTMLDivElement = event.target as HTMLDivElement;
    let lang_name: HTMLSpanElement = lang.firstChild as HTMLSpanElement;

    if (lang.classList.contains('prof_expand')) {
        lang_name.classList.remove('lang_name_expand');
        lang.classList.remove('prof_expand');
        
        let lang_about: HTMLDivElement = document.getElementById(lang.id + '_about') as HTMLDivElement;
        lang_about.style.opacity = '0';

        setTimeout(() => {
            lang.innerHTML = "";
            lang.appendChild(lang_name);
        }, 700)
    } else {
        lang_name.classList.add('lang_name_expand');
        lang.classList.add('prof_expand');

        let lang_info: language | null = determineLanguage(lang);

        if (lang_info != null) {
            let lang_about: HTMLDivElement = document.createElement("div");
            lang_about.innerText = lang_info.about;
            lang_about.classList.add('lang_about_base');
            lang_about.id = lang_info.name + '_about';

            lang.appendChild(lang_about);

            setTimeout(() => {
                lang_about.style.opacity = '1';
            }, 700)
        }
    }
}

function determineLanguage(div: HTMLDivElement): language | null {
    let lang: language | null = null;
    
    info.languages.forEach((value) => {
        console.log(div.id);
        console.log(value.name);
        
        if (div.id === value.name) {
            lang = value;
        }
    })

    return lang;
}