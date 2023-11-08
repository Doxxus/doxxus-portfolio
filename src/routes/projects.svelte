<script lang="ts">
    export let projects: Array<Project>;

    interface Project {
        id: number,
        title: string,
        about: string,
        icon: string,
        dark_text: boolean,
        github_link: string,
        technologies: Array<Technology>
    }

    interface Technology {

    }

    function OpenGithub(link: string) {      
        if (link === "") return;
        window.open(link);
    }

</script>

<main>
    <div class="outer_container">
        {#each projects as project}
            <button class="project_container" on:click={() => {OpenGithub(project.github_link)}}>
                {#if project.title.length > 12}
                    <h2 class:light={!project.dark_text} class:dark={project.dark_text} class="twolinetext">{project.title}</h2>
                {:else}
                    <h2 class:light={!project.dark_text} class:dark={project.dark_text} class="onelinetext">{project.title}</h2>
                {/if}     
                <img class="project_icon" src={project.icon} alt="">    
            </button>
        {/each}
    </div>
</main>

<style lang="scss">
    .outer_container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(auto-fit, 1fr);
        padding: 8px;
        margin: 20px;
        gap: 0.5em;
        place-items: center;
    }

    .project_container {
        width: 150px;
        height: 150px;
        position: relative;
        transition: 0.3s;
        max-width: 500px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 50px;
        @apply bg-violet-400;
        box-shadow: 6px 6px rgb(26, 19, 46);

        :hover {
            box-shadow: 0px 0px rgb(26, 19, 46);
        }

        h2 {
            position: absolute;
            font-size: 1em;
            font-weight: 700;
            font-family: Helvetica;
            width: 100%;
            height: 100%;
            background: transparent;
            opacity: 1;
            overflow: hidden;
            text-align: center;
            z-index: 20;
        }

        .twolinetext {
            top: 33%;
        }

        .onelinetext {
            top: 41%;
        }

        .light {
            @apply text-translucent-violet;
        }

        .dark {
            @apply text-muddy-violet;
        }       
    }

    .project_icon {
        size: 100%;
        overflow: hidden;
        position: relative;
        z-index: 0;
        border-radius: 50px;

        
        mix-blend-mode: luminosity;
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
        opacity: 1;
    }
</style>