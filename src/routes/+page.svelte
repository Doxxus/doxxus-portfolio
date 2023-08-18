<script lang="ts">
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import type { Action } from 'svelte/action';

    import { Intro } from '../TypeScripts/intro';
    import { Elements } from '../TypeScripts/elements';
    
    import About from './about.svelte';
    import Experience from './experience.svelte';
    import Skillset from './skillset.svelte';
    import Contact from './contact.svelte';
    
    import * as info from '../json/info.json'; 

    let show_links: boolean = false;

    onMount(() => { 
        document.title = "Doxxus Portfolio";
        Intro.AnimateIntro();

        setTimeout(() => {
            show_links = true;
        }, 5350);
    });

    let age: string = "";
    setInterval(() => {
        let today: Date = new Date();
        let birthday: Date = new Date (869371200000);

        age = ((Number(today) - Number(birthday)) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(9);
    }, 50);

    let show_about: boolean = false;
    let show_experience: boolean = false;
    let show_skillset: boolean = false;
    let show_projects: boolean = false;
    let show_contact: boolean = false; 

    let init_about: boolean = false;
    let init_skillset: boolean = false;
    let init_contact: boolean = false;

    function ToggleExpand(show: boolean): boolean {
        return !show;
    }

    let OpenExperiences: Function;
    let CloseExperiences: Function;

    function OpenExperiencesCheck() {
        if (show_experience) return;
        OpenExperiences();
    }

    function CloseExperiencesCheck() {
        if (show_experience) return;
        CloseExperiences();
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

<main class="main_page_container"> 
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
            <p class="text-zinc-200 tight">I'm a <my_age>{age}</my_age> year old programmer with a wide array of experience in many languages, frameworks, and platforms.</p>
            <p class="text-zinc-200 tight">{info.about_interest}</p>
        </div>
        <div class="center">
            <div id="About" class="info_base fade_in" class:expand={show_about} style="--expand_height: 140px;" bind:this={Elements.eleEducation} on:mouseenter={() => {init_about = true}} on:mouseleave={() => {init_about = false}} on:click={() => {show_about = ToggleExpand(show_about)}} on:keydown={() => {show_about = ToggleExpand(show_about)}}>
                <span class="sub_heading">About</span>
                <About about_text={info.about_text} show_about={show_about} init_about={init_about}></About>
            </div>
            <div id="Experience" class="info_base fade_in" class:expand={show_experience} style="--expand_height: 520px;" bind:this={Elements.eleExperience} on:mouseenter={() => {OpenExperiencesCheck();}} on:mouseleave={() => {CloseExperiencesCheck();}} on:click={() => {show_experience = ToggleExpand(show_experience); OpenExperiencesCheck();}} on:keydown={() => {show_experience = ToggleExpand(show_experience)}}>
                <span class="sub_heading">Experience</span>
                <Experience experiences='{info.experiences}' bind:open_timeline={OpenExperiences} bind:close_timeline={CloseExperiences}></Experience>
            </div>
            <div id="Languages" class="info_base fade_in" class:expand={show_skillset} style="--expand_height: {(info.languages.length * 40) + 50}px;" bind:this={Elements.eleLanguages} on:mouseenter={() => {init_skillset = true}} on:mouseleave={() => {init_skillset = false}} on:click={() => {show_skillset = ToggleExpand(show_skillset)}} on:keydown={() => {show_skillset = ToggleExpand(show_skillset)}}>
                <span class="sub_heading">Skills</span>
                <Skillset languages='{info.languages}' show_skillset='{show_skillset}' init_skillset='{init_skillset}'></Skillset>
            </div>
            <div id="Projects" class="info_base fade_in" class:expand={show_projects} style="--expand_height: 520px;" bind:this={Elements.eleProjects} on:click={() => {show_projects = ToggleExpand(show_projects)}} on:keydown={() => {show_projects = ToggleExpand(show_projects)}}>
                <span class="sub_heading">Projects</span>
            </div>
            <div id="Contact" class="info_base fade_in" class:expand={show_contact} style="--expand_height: 400px;" bind:this={Elements.eleContact} on:mouseenter={() => {init_contact = true}} on:mouseleave={() => {init_contact = false}} on:click={() => {show_contact = ToggleExpand(show_contact)}} on:keydown={() => {show_contact = ToggleExpand(show_contact)}}>
                <span class="sub_heading">Contact</span>
                <Contact show_contact='{show_contact}' init_contact='{init_contact}'></Contact>
            </div>
            <div class="links_container" class:show={show_links}>
                <div class="link_container">
                    <button on:click={() => {window.open("https://github.com/doxxus")}}>
                        <img class="link_image" src='./links/github.png' alt='' />
                    </button>
                </div>
                <div class="link_container">
                    <button on:click={() => {window.open("https://www.linkedin.com/in/lachlan-campbell-doxxus/")}}>
                        <img class="link_image" src='./links/linkedin.png' alt='' />
                    </button>
                </div>
                <div class="link_container">
                    <button on:click={() => {window.open("./resume_no_reference.pdf")}}>
                        <img class="link_image" src='./links/resume.png' alt='' />
                    </button>
                </div>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    $n: 7;

    @for $i from 1 through $n {
        .fade_in:nth-child(#{$i}) {
            transition-delay: 200ms * $i;
        }
    }

    .expand {
        height: var(--expand_height);
        border-width: 2px;
    }

    .links_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 40vw;
        height: fit-content;
        margin: 10px;
        margin-left: 30vw;
        margin-right: 30vw;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;

        &.show {
            opacity: 1;
        }
    }

    .link_container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .link_image {
        width: 50;
        height: 50px;
    }
</style>
