<script lang="ts">
	const youtube_link_regex =
		/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/gim;

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
	let url: string;

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

	async function searchVideoInfo() {
		const video_url = youtube_link_regex.test(url) ? url : null;
		if (!video_url) return;

		const reponse = await fetch(`/ytdl/info?video_url=${video_url}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (reponse.status !== 200) return alert('Error: ' + reponse.status);
		info = await reponse.json();
	}
</script>

<div id="video-input">
	<input
		type="text"
		bind:value={url}
		placeholder="Youtube Video URL (e.g. https://www.youtube.com/watch?v=oHg5SJYRHA0)"
		pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
		required
	/>
	<button on:click={searchVideoInfo}>Search</button>
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

<style>
	#video-input {
		display: flex;
		flex-direction: column;
		width: 80%;
	}

	input:valid {
		background-color: palegreen;
	}

	input:invalid {
		background-color: lightpink;
	}

	.format-item {
		list-style: none;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
