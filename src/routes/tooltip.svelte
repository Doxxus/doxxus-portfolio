<!-- Adapted from https://svelte.dev/repl/dd6754a2ad0547c5b1c1ea37c0293fef?version=4.2.18 -->

<script>
	export let title;
	export let x;
	export let y;
</script>
<div style="
		top: {y + 5}px;
		left: {x + 5}px;
		--tw-bg-opacity: 60%">{title}</div>

<style lang="scss">
	div {
		@apply bg-muddy-violet;
		backdrop-filter: blur(10px);
		border: 1px solid #a78bfa;
		box-shadow: 1px 1px 1px #a78bfa; 
		color: white;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
	}
</style>