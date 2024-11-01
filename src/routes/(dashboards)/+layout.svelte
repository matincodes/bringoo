<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="grid grid-cols-12 min-h-screen">
	<Navbar />
	<main class="col-span-11 bg-dashBlue px-10 py-4">
		<Header />
		<slot></slot>
	</main>
</div>
