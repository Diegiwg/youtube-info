<script lang="ts">
	let info: {
		formats: [
			{
				hasAudio: boolean;
				hasVideo: boolean;
				url: string;
				qualityLabel: string;
				mimeType: string;
			}
		];
		videoDetails: {
			title: string;
		};
	};
	let url: string = 'https://www.youtube.com/watch?v=azAEHCQgcUI';

	function formatName(format: (typeof info.formats)[0]) {
		const has =
			format.hasAudio && format.hasVideo
				? 'Audio and Video'
				: format.hasAudio
				? 'Audio only'
				: format.hasVideo
				? 'Video only'
				: 'No Audio or Video';
		const mimeType = format.mimeType ? format.mimeType.split(';')[0] : '';

		return `${has} (${mimeType})`;
	}

	function formatWithAudioVideo(data: typeof info) {
		return data.formats.filter((f) => f.hasAudio && f.hasVideo)[0].url;
	}

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
	<div id="info">
		<h1 class="title">{info.videoDetails.title}</h1>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video src={formatWithAudioVideo(info)} autoplay controls />
		<ul class="formats">
			{#each info.formats as format}
				<li class="format-item">
					<span class="format-item-name">{formatName(format)}</span>
					<a class="format-item-url" href={format.url} rel="noreferer">DOWNLOAD</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
