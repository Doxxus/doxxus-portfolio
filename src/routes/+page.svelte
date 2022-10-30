<script lang="ts">
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import type { Action } from 'svelte/action';

    let eleTitle: HTMLElement;
    let eleMainContent: HTMLElement;
    
    let eleAbout: HTMLElement;
    let eleExperience: HTMLElement;
    let eleLanguages: HTMLElement;
    let eleProjects: HTMLElement;
    let eleEducation: HTMLElement;
    let eleContact: HTMLElement;

    let lineDownSvg: SVGSVGElement;
    let lineDown: SVGLineElement;
    let leftLine: SVGLineElement;
    let rightLine: SVGLineElement;

    // Intro Animation Timeouts
    onMount(() => {
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
    });
    
    let age: string = "";

    setInterval(() => {
        let today: Date = new Date();
        let birthday: Date = new Date (869371200000);

        age = ((Number(today) - Number(birthday)) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(9);
    }, 50);

    //#region Spring-in Actions
    type SpringInActionTranslate = Action<HTMLElement, SpringInParamsTranslate>;
    type SpringInParamsTranslate = {
        translateX: number,
        translateY: number
    }

    const springInFromRight: SpringInActionTranslate = (node, params) => {
        if (!params) return;

        const { translateX, translateY } = params;
        const value = { translateX: 100, translateY: 0 }
        const options = { stiffness: 0.05, damping: 1.3 }
        
        // Create spring store
        let transition = spring(value, options);

        // Subscribe to store
        const unsubscribe = transition.subscribe(({ translateX, translateY }) => {
            node.style.transform = `translate(${translateX}%, ${translateY}%)`
        })

        // Store update starts animation
        transition.set(({translateX, translateY}));

        return {
            destroy: () => unsubscribe()
        }
    }

    const springInFromLeft: SpringInActionTranslate = (node, params) => {
        if (!params) return;

        const { translateX, translateY } = params;
        const value = { translateX: -100, translateY: 0 }
        const options = { stiffness: 0.05, damping: 1.3 }
        
        // Create spring store
        let transition = spring(value, options);

        // Subscribe to store
        const unsubscribe = transition.subscribe(({ translateX, translateY }) => {
            node.style.transform = `translate(${translateX}%, ${translateY}%)`
        })

        // Store update starts animation
        transition.set(({translateX, translateY}));

        return {
            destroy: () => unsubscribe()
        }
    }
    //#endregion
</script>

<html lang="svelte" class="bg-zinc-200 dark:bg-zinc-800">
    <main class="bg-zinc-200 dark:bg-zinc-800">
        <div id="title" bind:this={eleTitle}>
            <div class="rectangle-60" use:springInFromRight={{translateX: 0, translateY: 0}}>
                <h1 class="text-zinc-800 dark:text-zinc-200">Doxxus</h1>
            </div>
            <div class="rectangle-60" use:springInFromLeft={{translateX: 0, translateY: 0}}>
                <h2 class="text-violet-900 dark:text-violet-400">Computer Scientist</h2>
            </div>
        </div>

        <svg id="linedown" bind:this={lineDownSvg}>
            <line bind:this={lineDown} class="stroke-violet-900 dark:stroke-violet-400" x1=0 y1=0 x2=0 y2=63></line>
        </svg>
        <svg id="rect">
            <line id="lineleft" bind:this={leftLine} class="stroke-violet-900 dark:stroke-violet-400" x1=-600 y1=0 x2=0 y2=0></line>
            <line id="lineright" bind:this={rightLine} class="stroke-violet-900 dark:stroke-violet-400" x1=0 y1=0 x2=600 y2=0></line>
        </svg>

        <div id="main_content" bind:this={eleMainContent}>
            <div id="about" class="fade_in" bind:this={eleAbout}>
                <p class="text-zinc-800 dark:text-zinc-200 tight">I'm a <my_age>{age}</my_age> year old programmer with a wide array of experience in many languages, frameworks, and platforms.</p>
                <p class="text-zinc-800 dark:text-zinc-200 tight">I'm currently interested in learning the SvelteKit framework and associated TypeScript web stack.</p>
            </div>
            <div class="center">
                <div id="Experience" class="info_base fade_in" bind:this={eleExperience}>
                    <span class="sub_heading">Experience</span>
                </div>
                <div id="Languages" class="info_base fade_in" bind:this={eleLanguages}>
                    <span class="sub_heading">Languages</span>
                </div>
                <div id="Projects" class="info_base fade_in" bind:this={eleProjects}>
                    <span class="sub_heading">Projects</span>
                </div>
                <div id="Education" class="info_base fade_in" bind:this={eleEducation}>
                    <span class="sub_heading">Education</span>
                </div>
                <div id="Contact" class="info_base fade_in" bind:this={eleContact}>
                    <span class="sub_heading">Contact</span>
                </div>
            </div>
        </div>
    </main>
</html>
