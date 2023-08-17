<script lang="ts">
    export let about_text: string;

    let left_line: SVGLineElement;
    let right_line: SVGLineElement;

</script>

<main>
    <svg id="rect">
        <line id="lineleft" bind:this={left_line} class="stroke-violet-900 dark:stroke-violet-400" x1=10vw y1=0 x2=50vw y2=0></line>
        <line id="lineright" bind:this={right_line} class="stroke-violet-900 dark:stroke-violet-400" x1=50vw y1=0 x2=90vw y2=0></line>
    </svg>
    <div class="about_container">
        <p class="about_text">{about_text}</p>
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
    }

    .about_container {
        margin: 20px;
    }

    .about_text {
        @apply text-translucent-violet;
    }
</style>