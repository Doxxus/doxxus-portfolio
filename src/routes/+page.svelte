<script lang="ts">
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import type { Action } from 'svelte/action';

    import { Intro } from '../TypeScripts/intro';
    import { Elements } from '../TypeScripts/elements';
    import Skillset from './skillset.svelte';

    import * as info from '../json/info.json';

    onMount(Intro.AnimateIntro);

    let age: string = "";
    setInterval(() => {
        let today: Date = new Date();
        let birthday: Date = new Date (869371200000);

        age = ((Number(today) - Number(birthday)) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(9);
    }, 50);

    let show_experience: boolean = false;
    let show_skillset: boolean = false;
    let show_projects: boolean = false;
    let show_education: boolean = false;
    let show_contact: boolean = false;

    let init_skillset: boolean = false;

    function ToggleExpand(show: boolean): boolean {
        return !show;
    }

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

<main> 
    <div class="space_background"></div>

    <div id="title" bind:this={Elements.eleTitle}>
        <div class="rectangle-60" use:springInFromRight={{translateX: 0, translateY: 0}}>
            <h1 class="text-zinc-800 dark:text-zinc-200">Doxxus</h1>
        </div>
        <div class="rectangle-60" use:springInFromLeft={{translateX: 0, translateY: 0}}>
            <h2 class="text-violet-900 dark:text-violet-400">Computer Scientist</h2>
        </div>
    </div>

    <svg id="linedown" bind:this={Elements.lineDownSvg}>
        <line bind:this={Elements.lineDown} class="stroke-violet-900 dark:stroke-violet-400" x1=0 y1=0 x2=0 y2=63></line>
    </svg>
    <svg id="rect">
        <line id="lineleft" bind:this={Elements.leftLine} class="stroke-violet-900 dark:stroke-violet-400" x1=10vw y1=0 x2=50vw y2=0></line>
        <line id="lineright" bind:this={Elements.rightLine} class="stroke-violet-900 dark:stroke-violet-400" x1=50vw y1=0 x2=90vw y2=0></line>
    </svg>

    <div id="main_content" bind:this={Elements.eleMainContent}>
        <div id="about" class="fade_in" bind:this={Elements.eleAbout}>
            <p class="text-zinc-800 dark:text-zinc-200 tight">I'm a <my_age>{age}</my_age> year old programmer with a wide array of experience in many languages, frameworks, and platforms.</p>
            <p class="text-zinc-800 dark:text-zinc-200 tight">I'm currently interested in learning the SvelteKit framework and associated TypeScript web stack.</p>
        </div>
        <div class="center">
            <div id="Experience" class="info_base fade_in" class:expand={show_experience} bind:this={Elements.eleExperience} on:click={() => {show_experience = ToggleExpand(show_experience)}} on:keydown={() => {show_experience = ToggleExpand(show_experience)}}>
                <span class="sub_heading">Experience</span>
            </div>
            <div id="Languages" class="info_base fade_in" class:expand={show_skillset} bind:this={Elements.eleLanguages} on:mouseenter={() => {init_skillset = true}} on:mouseleave={() => {init_skillset = false}} on:click={() => {show_skillset = ToggleExpand(show_skillset)}} on:keydown={() => {show_skillset = ToggleExpand(show_skillset)}}>
                <span class="sub_heading">Skills</span>
                <Skillset languages='{info.languages}' show_skillset='{show_skillset}' init_skillset='{init_skillset}'></Skillset>
            </div>
            <div id="Projects" class="info_base fade_in" class:expand={show_projects} bind:this={Elements.eleProjects} on:click={() => {show_projects = ToggleExpand(show_projects)}} on:keydown={() => {show_projects = ToggleExpand(show_projects)}}>
                <span class="sub_heading">Projects</span>
            </div>
            <div id="Education" class="info_base fade_in" class:expand={show_education} bind:this={Elements.eleEducation} on:click={() => {show_education = ToggleExpand(show_education)}} on:keydown={() => {show_education = ToggleExpand(show_education)}}>
                <span class="sub_heading">Education</span>
            </div>
            <div id="Contact" class="info_base fade_in" class:expand={show_contact} bind:this={Elements.eleContact} on:click={() => {show_contact = ToggleExpand(show_contact)}} on:keydown={() => {show_contact = ToggleExpand(show_contact)}}>
                <span class="sub_heading">Contact</span>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    .expand {
        height: 500px;
        border-width: 2px;
    }
</style>
