export namespace Intro {
    export let eleTitle: HTMLElement;
    export let eleMainContent: HTMLElement;

    export let eleAbout: HTMLElement;
    export let eleExperience: HTMLElement;
    export let eleLanguages: HTMLElement;
    export let eleProjects: HTMLElement;
    export let eleEducation: HTMLElement;
    export let eleContact: HTMLElement;

    export let lineDownSvg: SVGSVGElement;
    export let lineDown: SVGLineElement;
    export let leftLine: SVGLineElement;
    export let rightLine: SVGLineElement;

    export function AnimateIntro() {
        setTimeout(() => {
            eleTitle.style.opacity = '1';
        }, 50);

        setTimeout(() => {
            eleTitle.classList.add('top');
        }, 3000);

        setTimeout(() => {
            lineDownSvg.style.left ='50%';
            lineDownSvg.style.opacity = '1';

            lineDown.style.transition = 'stroke-dashoffset 0.5s linear';
            lineDown.style.strokeDashoffset = '-63px';
        }, 3800);

        setTimeout(() => {
            leftLine.style.opacity = '1';
            leftLine.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
            leftLine.style.strokeDashoffset = '0px';

            rightLine.style.opacity = '1';
            rightLine.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
            rightLine.style.strokeDashoffset = '0px';
        }, 4050);

        setTimeout(() => {
            eleAbout.classList.add('show_fade');
            eleExperience.classList.add('show_fade');
            eleLanguages.classList.add('show_fade');
            eleProjects.classList.add('show_fade');
            eleEducation.classList.add('show_fade');
            eleContact.classList.add('show_fade');
        }, 4100);   

        setTimeout(() => {
            eleExperience.classList.add('rectangle-500');
            eleExperience.style.transitionDelay = '0ms';

            eleLanguages.classList.add('rectangle-500');
            eleLanguages.style.transitionDelay = '0ms';

            eleProjects.classList.add('rectangle-500');
            eleProjects.style.transitionDelay = '0ms';

            eleEducation.classList.add('rectangle-500');
            eleEducation.style.transitionDelay = '0ms';

            eleContact.classList.add('rectangle-500');
            eleContact.style.transitionDelay = '0ms';
        }, 5800);
    }
}