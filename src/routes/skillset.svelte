<script lang="ts">
    export let languages: Array<language>;
    export let show_skillset: boolean;
    export let init_skillset: boolean;
    
    interface framework {
        id: number,
        name: string,
        expand: boolean,
        image_path: string,
        about: string
    }
    
    interface language {
        id: number,
        name: string,
        proficiency: number,
        expand: boolean,
        image_path: string,
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
            <div class="lang_prof" class:no_delay={no_delay} class:expand={lang.expand} class:show={show_skillset || init_skillset} style="--width: {lang.proficiency * 0.98}%; --delay: {lang.id * 50}ms; --top: {lang.id * 35 + 80}px; --anim_delay: {Math.random() * 6000}ms;" on:click|stopPropagation={() => {lang.expand = !lang.expand; FixDelay();}} on:keydown={() => {lang.expand = !lang.expand}}>               
                <span class="lang_name" class:no_delay={no_delay} class:expand={lang.expand} class:show={show_skillset || init_skillset} style="--delay: {lang.id * 50}ms;">{lang.name}</span>
                <div class="lang_info_container" class:show={lang.expand}>
                    <div class="lang_logo"><img src='{lang.image_path}' alt=''/></div>
                    <div class="lang_about"><span>{lang.about}</span></div>
                    {#if lang.frameworks.length == 0}
                        <div class="no_frameworks">
                            <span>No additional frameworks, libraries, or additional technologies here, just raw {lang.name}!</span>
                        </div>
                    {:else}
                        <div class="frameworks_title">Frameworks / Libraries / Related Technologies</div>
                        <div class="frameworks_container">
                            {#each lang.frameworks as fw}
                                <div class="framework" style="--padding: {Math.max(18 - (lang.frameworks.length) * 2, 2)}%;">
                                    <img src='{fw.image_path}' alt=''/>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>              
            </div>
        {/each}
    </div>
</main>

<style lang="scss">
    .lang_info_container {
        display: grid;
        grid-template-columns: [col1] 45% [col2] 1fr [col3] 45% [col4] auto;
        grid-template-rows: [row0] 30px [row1] 120px [row2] 1fr [row3] auto;
        place-items: center;
        transition: opacity 0.2s ease;
        transition-delay: 0s;
        opacity: 0;
    }

    .lang_info_container.show {
        opacity: 1;
        transition-delay: 0.7s;
    }

    .lang_logo {
        object-fit: cover;
        width: 20%;
        grid-column: col1 / col2;
        grid-row: row0 / row2;
    }

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
        animation-delay: var(--anim_delay);
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
        width: 100%;
        
        right: 0%;
        transition: 200ms transform;

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
        height: 450px;
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
        grid-column: col1 / col2;
        grid-row: row2 / row3;
        pointer-events: none;
        padding-left: 50px;
        padding-right: 50px;
        padding-top: 10px;
        height: fit-content;
        text-align: center;
    }

    .frameworks_title {
        width: 100%;
        font-size: 1.2em;
        text-align: center;
        grid-column: col3 / col4;
        grid-row: row0 / row1;
    }

    .frameworks_container {
        width: 100%;
        grid-column: col3 / col4;
        grid-row: row1 / row3;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
        place-items: center;

        padding: 10px;
    }

    .framework {
        position: relative;
        padding: var(--padding);
    }

    .no_frameworks {
        grid-column: col3 / col4;
        grid-row: row0 / row3;

        text-align: center;
        font-size: 2em;
        padding: 50px;
    }

    .no_delay {
        transition-delay: 0ms !important;
    }

    .lang_tooltip {
        @apply dark:text-translucent-violet text-muddy-violet;
    }
</style>