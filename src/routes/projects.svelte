<script lang="ts">
    export let projects: Array<Project>;

    interface Project {
        id: number,
        title: string,
        expand: boolean,
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
    <span class="tooltip">Click on a project to visit its Github page (if it's available).</span>
    <div class="outer_container">
        {#each projects as project}
            <button class:expand={project.expand} class="project_container" on:mouseenter={() => {project.expand = true}} on:mouseleave={() => {project.expand = false}} on:click|stopPropagation={() => {OpenGithub(project.github_link)}}
                style="--top: {Math.floor(project.id / 3) * 250 + 70}px; --left: {project.id % 3 * 39 + 5}%">
                {#if project.title.length > 20}
                    <h2 class:light={!project.dark_text} class:dark={project.dark_text} class:expand={project.expand} class="twolinetext">{project.title}</h2>
                {:else}
                    <h2 class:light={!project.dark_text} class:dark={project.dark_text} class:expand={project.expand} class="onelinetext">{project.title}</h2>
                {/if}     
                <img class="project_icon" src={project.icon} alt="">
                <div class="info_container">
                    <p class="project_description">{project.about}</p>
                </div>
            </button>
        {/each}
    </div>
</main>

<style lang="scss">
    .tooltip {
        @apply dark:text-translucent-violet text-muddy-violet;
    }

    .outer_container {
        width: 100%;
    }

    .project_container.expand {
        height: 200px;
        width: 90%;
        left: 5%;
        z-index: 25;
    }

    .project_container {
        top: var(--top);
        left: var(--left);
        width: 200px;
        height: 200px;
        position: absolute;
        transition: 0.3s;
        border-radius: 50px;
        @apply bg-violet-400;
        box-shadow: 6px 6px rgb(26, 19, 46);
        display: flex;
        flex-direction: column;
        overflow: hidden;

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
            transition: all 0.2s;
        }

        .twolinetext.expand {
            top: 5%;       
        }

        .onelinetext {
            top: 41%;
            transition: all 0.2s;
        }

        .onelinetext.expand {
            top: 5%;
        }

        .light {
            @apply text-translucent-violet;
        }

        .dark {
            @apply text-muddy-violet;
        }
        
        .project_icon {
            height: 200px;
            width: 200px;
            overflow: hidden;
            position: absolute;
            z-index: 0;
            border-radius: 50px;
            
            mix-blend-mode: luminosity;
            -webkit-filter: grayscale(100%);
            filter: grayscale(100%);
            opacity: 1;
        }

        .info_container {
            position: absolute;
            height: 200px;
            width: 500px;
            font-size: 0.8em;
            text-align: left;
            top: 25%;
            left: 205px;
            opacity: 1;
        }
    }
  
</style>