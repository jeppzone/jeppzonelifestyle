<script>
	import '../app.css';
</script>

<div class="app bg-gradient-to-r from-slate-950 to-slate-900">
	<div class="w-full grid justify-center">
		<a href="/" class="text-white border border-white p-5 rounded-l mt-10">Home</a>
	</div>
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
