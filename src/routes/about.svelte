<script lang="ts">
    export let about_text: string;
    export let show_about: boolean;
    export let init_about: boolean;

    let left_line: SVGLineElement;
    let right_line: SVGLineElement;
</script>

<main>
    <div>
        <svg class="rect_container">
            <line id="line_left" bind:this={left_line} class="stroke-violet-900 dark:stroke-violet-400" class:show={show_about || init_about} x1=2% y1=0 x2=50% y2=0></line>
            <line id="line_right" bind:this={right_line} class="stroke-violet-900 dark:stroke-violet-400" class:show={show_about || init_about} x1=50% y1=0 x2=98% y2=0></line>
        </svg>
    </div>
    <div class="about_container">
        <p class="about_text" class:show={show_about || init_about} style="--transition_delay: 0.4s">{about_text}</p>
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
    }

    .rect_container {
        position: absolute;
        overflow: visible;
        left: 0;
        //top: 160px;
        width: 100%;
    }

    .about_container {
        margin-top: 5px;
        margin-left: 3%;
        margin-right: 3%;
        overflow: hidden;
    }

    .about_text {
        @apply text-translucent-violet;
        font-size: 0.8em;

        transform: translateY(-100px); 
        transition: 0.5s ease-in-out var(--transition_delay);     

        &.show {
            transform: translateY(0px);
        }
    }

    #line_left, #line_right {
        stroke-width: 2px;
        stroke-dasharray: 80%;
        stroke-linecap: round;
        fill: transparent;
        opacity: 0;

        &.show {
            opacity: 1;
            transition: stroke-dashoffset 0.5s ease-in-out;
            stroke-dashoffset: 0px;
        }
    }

    #line_left {
        stroke-dashoffset: -40vw;
    }

    #line_right {
        stroke-dashoffset: 40vw;
    }

</style>