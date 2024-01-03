<script lang="ts">
    export let show_contact: boolean;
    export let init_contact: boolean;

    let name_input: HTMLInputElement;
    let email_input: HTMLInputElement;
    let message_input: HTMLTextAreaElement;
    let submit_button: HTMLButtonElement;
    
    function SendEmail() {
        alert("This funciton is unavailable at the moment, please send an email to lachlan@doxxus.ca instead. Apppologies for the inconvenience.");
    }
</script>

<svelte:head>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
</svelte:head>

<main>
    <span class="text-translucent-violet">For business inquiries, send an email to <b>lachlan@doxxus.ca</b> or enter your message below</span>
    <div class="form_container" class:hide={!show_contact && !init_contact}>
        <form class="form_type">
            <div class="input_wrapper" on:click|stopPropagation={() => {name_input.focus()}} on:keydown|stopPropagation={null} class:animate_fw={show_contact || init_contact} style="--anim_delay: 0ms">
                <input bind:this={name_input} on:keydown|stopPropagation={null} type="text" class="text_field" class:fade_in={show_contact || init_contact} style="--transition_delay: 300ms" id="name" placeholder="Your Name" required>
            </div>
            <div class="input_wrapper" on:click|stopPropagation={() => {email_input.focus()}} on:keydown|stopPropagation={null} class:animate_fw={show_contact || init_contact} style="--anim_delay: 200ms">
                <input bind:this={email_input} on:keydown|stopPropagation={null} type="email" class="text_field" class:fade_in={show_contact || init_contact} style="--transition_delay: 500ms" id="email_addr" placeholder="Your Email Address" required>
            </div>
            <div class="input_wrapper" on:click|stopPropagation={() => {message_input.focus()}} on:keydown|stopPropagation={null} class:animate_fw={show_contact || init_contact} style="--anim_delay: 400ms">
                <textarea bind:this={message_input} on:keydown|stopPropagation={null} class="text_field" class:fade_in={show_contact || init_contact} style="--transition_delay: 700ms" id="message" rows="6" placeholder="Your message here..."></textarea>
            </div>
            <div class="input_wrapper" on:mouseenter={() => {submit_button.focus()}} on:click|stopPropagation={() => {submit_button.focus()}} on:keydown|stopPropagation={null} class:animate_fw={show_contact || init_contact} style="--anim_delay: 600ms">
                <button bind:this={submit_button} on:click|preventDefault={() => {SendEmail()}} on:keydown|stopPropagation={null} class="submit_button" class:fade_in={show_contact || init_contact} style="--transition_delay: 900ms">SUBMIT</button>
            </div>
        </form>
    </div>
</main>

<style lang="scss">
    :root {
        --border_color: rgb(167 139 250);
        --text_color: rgb(218 213 234);
    }

    .form_container {
        width: 100%;
        height: fit-content;
        opacity: 1;
        transition: opacity 0.1s ease-in-out;

        &.hide {
            opacity: 0;
        }
    }

    .form_type {
        display: flex;
        flex-direction: column;
        background: none;
    }

    input:focus,
    textarea:focus,
    button:focus {
        outline: none;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
        background-color: transparent !important;
        -webkit-text-fill-color: var(--text_color);
        -webkit-box-shadow: 0 0 0 1000px transparent inset;
        transition: background-color 5000s ease-in-out 0s;
    }

    .text_field {
        @apply text-translucent-violet;
        margin: 5px;
        background: transparent;
        border-radius: 5px;
        width: 98%;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        transition-delay: var(--transition_delay);
        z-index: 20;

        &.fade_in {
            opacity: 1;
        }

        &:hover {
            cursor: pointer;
        }
    }

    .input_wrapper {
        border-radius: 10px;
        position: relative;
        margin: 5px;

        &::before,
        &::after {
            content: "";
            position: absolute;
            width: 0px;
            height: 0px;
            border-radius: 10px;
        }

        &::before {
            top: 0px;
            left: 0px;
            border-top: 2px solid transparent;
            border-left: 2px solid transparent;
        }

        &::after {
            right: 0px;
            bottom: 0px;
            border-bottom: 2px solid transparent;
            border-right: 2px solid transparent;
        }

        &.animate_fw::before {
            animation: anim_top 1s ease-in-out forwards;
            animation-delay: var(--anim_delay);
        }

        &.animate_fw::after {
            animation: anim_bot 1s ease-in-out forwards;
            animation-delay: var(--anim_delay);
        }

        @keyframes anim_top {
            0% {
                width: 0;
                height: 0;
                border-top-color: var(--border_color);
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
    
            50% {
                width: 100%;
                height: 0;
                border-top-color: var(--border_color);
                border-right-color: var(--border_color);
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
    
            100% {
                width: 100%;
                height: 100%;
                border-top-color: var(--border_color);
                border-right-color: var(--border_color)black;
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
        }

        @keyframes anim_bot {
            0% {
                width: 0;
                height: 0;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-left-color: var(--border_color);
            }
    
            50% {
                width: 0;
                height: 100%;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: var(--border_color);
                border-left-color: var(--border_color);
            }
    
            100% {
                width: 100%;
                height: 100%;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: var(--border_color);
                border-left-color: var(--border_color);
            }
        }
    }

    .submit_button {
        position: relative;
        border-color: transparent;
        border-radius: 10px;
        margin: 5px;
        font-family: Helvetica;
        font-weight: 500;
        @apply text-translucent-violet;
        width: 98%;
        z-index: 20;

        opacity: 0;
        transition: opacity 0.2s ease-in-out var(--transition_delay);

        &.fade_in {
            opacity: 1;
        }

        &:hover {
            letter-spacing: 5px;;
        }
    }
</style>