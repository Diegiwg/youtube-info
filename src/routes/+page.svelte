<script lang="ts">
	import { onMount } from 'svelte';

	let info: object;
	let url: string;

	async function new_video() {
		const reponse = await fetch('/ytdl/info', {
			method: 'POST',
			body: JSON.stringify({
				video_url: url
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		info = await reponse.json();

		console.log(info);
	}
</script>

<div>
	<input type="text" bind:value={url} />
	<button on:click={new_video}>Play</button>
</div>

{#if info}
	<p>{JSON.stringify(info)}</p>
{/if}
