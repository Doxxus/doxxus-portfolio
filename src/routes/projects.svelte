<script lang="ts">
    export let projects: Array<Project>;

    interface Project {
        id: number,
        title: string,
        about: string,
        github_link: string,
        technologies: Array<Technology>
    }

    interface Technology {

    }

</script>

<main>
    <div class="outer_container">
        {#each projects as project}
            <div class="project_container">{project.title}</div>
        {/each}
    </div>
</main>

<style lang="scss">
    .outer_container {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
    }

    .project_container {
        width: 100%;
        height: 100px;
    }
</style>