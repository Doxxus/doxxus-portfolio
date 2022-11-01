import { Elements } from './elements';

export function expandDivMouseHandler(event: MouseEvent) {
    expandDiv(event.target as HTMLElement);
}

export function expandDivKeyboardHandler(event: KeyboardEvent) {
    switch (event.key) {
        case 'x':
            expandDiv(Elements.eleExperience);
            break;
        case 'l':
            expandDiv(Elements.eleLanguages);
        case 'p':
            expandDiv(Elements.eleProjects);
            break;
        case 'd':
            expandDiv(Elements.eleEducation);
            break;
        case 'c':
            expandDiv(Elements.eleContact);
    }
}

function expandDiv(ele: HTMLElement) {
    let div: HTMLDivElement;
    
    if (ele.nodeName === 'SPAN') {
        div = ele.parentElement as HTMLDivElement;
    }
    else {
        div = ele as HTMLDivElement;
    }
    
    if (div.classList.contains('expand')) {
        div.classList.remove('expand');
    }
    else {
        div.classList.add('expand');
    }
}