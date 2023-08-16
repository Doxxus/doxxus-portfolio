<script lang="ts">
    export let languages: Array<language>;
    export let show_skillset: boolean;
    export let init_skillset: boolean;
    
    interface framework {

    }
    
    interface language {
        id: number,
        name: string,
        proficiency: number,
        expand: boolean,
        about: string,
        frameworks: Array<framework>
    }

    let no_delay: boolean = false;

    function FixDelay() {
        no_delay = true;
        
        setTimeout(() => {
            no_delay = false;
        }, 1000);
    }

</script>

<main style="padding-left:0px">
    <span class="lang_tooltip">Click on a language bar for more info.</span>

    <div class="lang_proficiencies">
        {#each languages as lang}
            <div class="lang_prof" class:no_delay={no_delay} class:expand={lang.expand} class:show={show_skillset || init_skillset} style="--width: {lang.proficiency * 0.98}%; --delay: {lang.id * 50}ms; --top: {lang.id * 35 + 80}px" on:click={() => {lang.expand = !lang.expand; FixDelay();}} on:keydown={() => {lang.expand = !lang.expand}}>
                <span class="lang_name" class:no_delay={no_delay} class:expand={lang.expand} class:show={show_skillset || init_skillset} style="--delay: {lang.id * 50}ms;">{lang.name}</span>
                <div class="lang_about" class:show={lang.expand}>{lang.about}</div>
            </div>
        {/each}
    </div>
</main>

<style lang="scss">
    .lang_proficiencies {
        @apply text-zinc-800 dark:text-zinc-200;
        font-family: Helvetica;       
        text-align: right;
        pointer-events: none;
        left: 120px;
        width: 100%;
        padding-right: 20px;
        height: fit-content;
    }

    .lang_prof {
        @apply bg-violet-400;

        display: block;
        position: absolute;
        top: var(--top);
        margin-top: 2px;
        margin-bottom: 5px;
        height: 30px;
        border-radius: 2px 10px 10px 2px;
        border: 0px;
        overflow: hidden;
        pointer-events: all;
        width: 0%;
        left: 0%;
        
        transition: width 0.7s ease-in-out;
        transition: 0.7s ease-in-out;   

        background: linear-gradient(-45deg, #a07dc0, #8f5acc, #6d41be, #5f43df, #4927df);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        opacity: 0.7;
        z-index: 5;
    }

    .lang_prof.show {
        width: var(--width);
        transition-delay: var(--delay);
    }

    .lang_name {
        pointer-events: none;
        position: relative;
        display: block;
        padding-top: 3px;
        margin-bottom: 1px;
        padding-right: 20px;
        
        right: 0%;

        opacity: 0;
        transition: opacity 0.2s ease;
        transition: 0.7s ease-in-out;
        z-index: 10;
    }
    
    .lang_name.show {
        opacity: 1;
        transition-delay: var(--delay);
    }

    .lang_prof.expand {
        position: absolute;
        top: 50px;
        height: 400px;
        width: 90% !important;
        left: 5%;
        border-radius: 20px 20px 20px 20px;
        z-index: 10;
        opacity: 1;
    }

    .lang_name.expand {       
        right: 45%;
        font-size: 2em;
    }

    .lang_about {
        pointer-events: none;
        position: absolute;
        width: 50%;
        padding: 10%;
        height: fit-content;
        text-align: center;
        opacity: 0;
        transition: opacity 0.2s ease;
        transition-delay: 0s;
    }

    .lang_about.show {
        opacity: 1;
        transition-delay: 0.7s;
    }

    .no_delay {
        transition-delay: 0ms !important;
    }

    .lang_tooltip {
        @apply dark:text-translucent-violet text-muddy-violet;
    }
</style>