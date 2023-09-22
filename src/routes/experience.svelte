<script lang="ts">
    export let experiences: Array<experience>;
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    interface duties {
        title: string,
        time_slice: number,
        color: string
    }

    interface technologies {
        lang: string,
        percent: number;
        color: string;
        hovered: boolean;
    }

    interface experience {
        id: number,
        start_date: string,
        end_date: string,
        company: string,
        position: string,
        current: boolean,
        about: string,
        duties: Array<duties>,
        technologies: Array<technologies>
    }

    let experience_default_size = 200;

    let expand_line: boolean = false;
    let show_dot: boolean = false;
    let show_dots: Array<boolean> = [];

    let duties_canvases: Array<HTMLCanvasElement> = [];
    
    for (let i = 0; i < experiences.length; i++) {
        show_dots[i] = false;
    }

    export const open_timeline: Function = () => {
        show_dot = true;

        setTimeout(() => {
            expand_line = true;
        }, 200);

        for (let i = 0; i < show_dots.length; i++) {
            setTimeout(() => {
                show_dots[i] = true;
            }, i * 500 + 300);
        }
    };

    export const close_timeline: Function = () => {
        expand_line = false;
        
        setTimeout(() => {
            show_dot = false;
        }, show_dots.length * 500);

        for (let i = show_dots.length - 1; i >= 0; i--) {
            setTimeout(() => {
                show_dots[i] = false;
            }, i * 500 + 300);
        }
    }

    onMount(() => {
        experiences.forEach((experience: experience) => {
            new Chart(duties_canvases[experience.id], {
                type: 'doughnut',
                data: {
                    labels: experience.duties.map(duty => duty.title),
                    datasets: [
                        {
                            label: 'Time Percentage',
                            data: experience.duties.map(duty => duty.time_slice),
                            backgroundColor: experience.duties.map(duty => duty.color)
                        }
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Responsibilities'
                        }
                    },
                }
            })
        });
    });

    const hoverTech = (event: MouseEvent, technologies: Array<technologies>) => {       
        let div: HTMLDivElement = event.target as HTMLDivElement;
        if (div === null) return;

        let outer_div: HTMLElement | null = div.parentElement;
        if (outer_div === null) return;

        outer_div.childNodes.forEach((child: ChildNode) => {
            let inner_div: HTMLDivElement = child as HTMLDivElement;
            inner_div.style.width = (20 / (technologies.length - 1)).toString() + "%";
        });      

        let p: HTMLParagraphElement = div.firstElementChild as HTMLParagraphElement;
        p.classList.add("show");
        
        if (outer_div.childNodes.length == 1) {
            div.style.width = "100%";
            return;
        }

        div.style.width = "80%";
    }

    const unhoverTech = (event: MouseEvent, experience: experience) => {
        let div: HTMLDivElement = event.target as HTMLDivElement;
        if (div === null) return;

        let outer_div: HTMLElement | null = div.parentElement;
        if (outer_div === null) return;

        for (let i = 0; i < outer_div.childNodes.length; i++) {
            let inner_div: HTMLDivElement = outer_div.childNodes[i] as HTMLDivElement;
            inner_div.style.width = experience.technologies[i].percent.toString() + "%";
        }

        let p: HTMLParagraphElement = div.firstElementChild as HTMLParagraphElement;
        p.classList.remove("show");
    }

</script>

<main style="padding: 0px 0px 10px 0px">
    <div class="outer_container">
        
        <div class="dot_marker" style="--top_dot: 10px">
            <span class="dot_marker_center" class:dot_marker_animate={show_dot} style="animation-delay:200ms"></span>
            <span class="dot_marker_inner" class:dot_marker_animate={show_dot} style="animation-delay:100ms"></span>
            <span class="dot_marker_outer" class:dot_marker_animate={show_dot} style="animation-delay:0ms"></span>
        </div>
        <div class="timeline_container" style="--height: {experiences.length * experience_default_size - 100}px; --duration: {experiences.length * 370 + 100}ms">         
            <div class="vert_line" class:show={expand_line}></div>            
        </div>

        {#each experiences as experience}
            <div class="dot_marker" style="--top_dot: {experience.id * experience_default_size + 100}px">
                <span class="dot_marker_center" class:dot_marker_animate={show_dots[experience.id]} style="animation-delay:200ms"></span>
                <span class="dot_marker_inner" class:dot_marker_animate={show_dots[experience.id]} style="animation-delay:100ms"></span>
                <span class="dot_marker_outer" class:dot_marker_animate={show_dots[experience.id]} style="animation-delay:0ms"></span>
            </div>
        {/each}
        <div class="experiences_container">
            {#each experiences as experience}
                <div class="experience_container" class:show-me={show_dots[experience.id]}>
                    <div class="experience_info">
                        {#if experience.current}
                            <h4 style="margin-top: 50px;">{experience.start_date} - Present</h4>
                        {:else}
                            <h4 style="margin-top: 50px;">{experience.start_date} - {experience.end_date}</h4>
                        {/if}
                        <h2>{experience.position} at {experience.company}</h2>
                        <p>{experience.about}</p>
                        <div class="technologies_wrapper">
                            <h2 style="text-align: right; margin-right: 5px;">Technologies Used </h2>
                            <div class="technologies_container">
                                {#each experience.technologies as technology}
                                    <div on:mouseenter={(event) => hoverTech(event, experience.technologies)} on:mouseleave={(event) => unhoverTech(event, experience)} class="technology" style="width: {technology.percent}%; background-color: {technology.color}">
                                        <p class="technology_name" class:show={technology.hovered}>{technology.lang}</p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                    <canvas class="duties_chart" bind:this={duties_canvases[experience.id]}></canvas>
                </div>
            {/each}
        </div>
    </div>
</main>

<style lang="scss">
    .outer_container {
        display: grid;
        grid-template-columns: [col1] 80px [col2] 0px [col3] 1fr [col4] auto;
        grid-template-rows: [row1] 450px [row2] auto;
        place-items: start center;
        left: 0%;
    }

    .timeline_container {
        grid-column: col1 / col2;
        grid-row: row1 / row2;
        height: var(--height);   
    }

    .experiences_container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-right: 2%;
    }

    .experience_container {
        position: relative;
        height: 200px;
        width: 100%;
        grid-column: col3 / col4;
        grid-row: row1 / row2;
        opacity: 0;
        transform: translateX(100%);
        transition: 600ms ease;
        display: flex;
        align-items: center;
    }

    .experience_info {
        flex-direction: column;
        text-align: left;
        align-items: flex-start;
        display: flex;
        z-index: 1;
        background-color: transparent;
    
        h2 {
            @apply text-translucent-violet;
            font-size: 1em;
        }

        h4 {
            @apply text-violet-400;
            font-size: 0.8em;          
        }

        p {
            @apply text-translucent-violet;
            font-size: 0.8em;
        }
    }

    .technologies_wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px;
    }

    .technologies_container {
        flex-direction: row;
        display: flex;
        width: 90%;
        height: 50px;
        border-radius: 5px;
        border-width: 1px;
    }

    .technology {
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        transition: 0.3s ease-in-out;
    }

    .technology_name {
        opacity: 0%;
        width: 100%;
        transition: 0.3s ease-in-out;
        text-align: center;
        font-size: 1.2em;

        &.show {
            opacity: 100%;
        }
    }

    .duties_chart {
        margin: 10px;
    }

    .show-me:nth-child(n) {
        transform: none;
        opacity: 1;
    }

    .vert_line {
        @apply bg-violet-400;

        height: 0%;
        width: 2px;
        top: 10px;
        position: relative;
        transition: height var(--duration) linear;
    }

    .vert_line.show {
        height: var(--height) !important;
        top: 10px;
    }

    .dot_marker {
        grid-column: col2 / col3;
        grid-row: row1 / row2;
        position: relative;
        top: var(--top_dot);
        left: -50px;
    }

    .dot_marker_center {
        @apply bg-violet-400;
        height: 16px;
        width: 16px;    
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        left: 2px;
        top: 2px;
        z-index: 20;
        opacity: 0;
        transform-origin: center;
    }

    .dot_marker_inner {
        @apply bg-violet-600;
        height: 16px;
        width: 16px;
        left: 2px;
        top: 2px;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        z-index: 19;
        opacity: 0;
        transform-origin: center;
    }

    .dot_marker_outer {
        @apply bg-violet-200;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        z-index: 18;
        opacity: 0;
        transform-origin: center;
    }   

    .dot_marker_animate {
        opacity: 1;
        animation-name: pop;
        animation-duration: 0.3s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
    }

    @keyframes pop {
        0% {
            transform: scale(0);
        }

        50% {
            transform: scale(2);
        }

        100% {
            transform: scale(1);
        }
    }
</style>