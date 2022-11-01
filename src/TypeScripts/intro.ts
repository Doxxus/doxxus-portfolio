import { Elements } from './elements';

export namespace Intro {
    export function AnimateIntro() {
        setTimeout(() => {
            Elements.eleTitle.style.opacity = '1';
        }, 50);

        setTimeout(() => {
            Elements.eleTitle.classList.add('top');
        }, 3000);

        setTimeout(() => {
            Elements.lineDownSvg.style.left ='50%';
            Elements.lineDownSvg.style.opacity = '1';

            Elements.lineDown.style.transition = 'stroke-dashoffset 0.5s linear';
            Elements.lineDown.style.strokeDashoffset = '-63px';
        }, 3800);

        setTimeout(() => {
            Elements.leftLine.style.opacity = '1';
            Elements.leftLine.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
            Elements.leftLine.style.strokeDashoffset = '0px';

            Elements.rightLine.style.opacity = '1';
            Elements.rightLine.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
            Elements.rightLine.style.strokeDashoffset = '0px';
        }, 4050);

        setTimeout(() => {
            Elements.eleAbout.classList.add('show_fade');
            Elements.eleExperience.classList.add('show_fade');
            Elements.eleLanguages.classList.add('show_fade');
            Elements.eleProjects.classList.add('show_fade');
            Elements.eleEducation.classList.add('show_fade');
            Elements.eleContact.classList.add('show_fade');
        }, 4100);   

        setTimeout(() => {
            Elements.eleExperience.classList.add('rectangle-500');
            Elements.eleExperience.style.transitionDelay = '0ms';

            Elements.eleLanguages.classList.add('rectangle-500');
            Elements.eleLanguages.style.transitionDelay = '0ms';

            Elements.eleProjects.classList.add('rectangle-500');
            Elements.eleProjects.style.transitionDelay = '0ms';

            Elements.eleEducation.classList.add('rectangle-500');
            Elements.eleEducation.style.transitionDelay = '0ms';

            Elements.eleContact.classList.add('rectangle-500');
            Elements.eleContact.style.transitionDelay = '0ms';
        }, 5800);
    }
}