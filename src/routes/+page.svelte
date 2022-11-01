<script lang="ts">
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import type { Action } from 'svelte/action';

    import { Intro } from '../TypeScripts/intro';
    import { Elements } from '../TypeScripts/elements';
    import * as helpers from '../TypeScripts/helpers';

    onMount(Intro.AnimateIntro);

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
        <line id="lineleft" bind:this={Elements.leftLine} class="stroke-violet-900 dark:stroke-violet-400" x1=-40vw y1=0 x2=0 y2=0></line>
        <line id="lineright" bind:this={Elements.rightLine} class="stroke-violet-900 dark:stroke-violet-400" x1=0 y1=0 x2=40vw y2=0></line>
    </svg>

    <div id="main_content" bind:this={Elements.eleMainContent}>
        <div id="about" class="fade_in" bind:this={Elements.eleAbout}>
            <p class="text-zinc-800 dark:text-zinc-200 tight">I'm a <my_age>{age}</my_age> year old programmer with a wide array of experience in many languages, frameworks, and platforms.</p>
            <p class="text-zinc-800 dark:text-zinc-200 tight">I'm currently interested in learning the SvelteKit framework and associated TypeScript web stack.</p>
        </div>
        <div class="center">
            <div id="Experience" class="info_base fade_in" bind:this={Elements.eleExperience} on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>
                <span class="sub_heading" on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>Experience</span>
            </div>
            <div id="Languages" class="info_base fade_in" bind:this={Elements.eleLanguages} on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>
                <span class="sub_heading" on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>Languages</span>
            </div>
            <div id="Projects" class="info_base fade_in" bind:this={Elements.eleProjects} on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>
                <span class="sub_heading" on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>Projects</span>
            </div>
            <div id="Education" class="info_base fade_in" bind:this={Elements.eleEducation} on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>
                <span class="sub_heading" on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>Education</span>
            </div>
            <div id="Contact" class="info_base fade_in" bind:this={Elements.eleContact} on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>
                <span class="sub_heading" on:click={helpers.expandDivMouseHandler} on:keydown={helpers.expandDivKeyboardHandler}>Contact</span>
            </div>
        </div>
    </div>
</main>
