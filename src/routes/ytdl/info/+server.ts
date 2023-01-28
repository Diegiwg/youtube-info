import ytdl from 'ytdl-core';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

async function getInfo(video_url: string): Promise<ytdl.videoInfo | null> {
	try {
		return await ytdl.getInfo(video_url);
	} catch {
		return null;
	}
}
export const GET = (async ({ url }) => {
	const video_url = new URL(url).searchParams.get('video_url');
	if (!video_url) return json({ error: 'video_url parameter was not received' }, { status: 404 });

	const video_info = await getInfo(video_url);
	if (!video_info)
		return json(
			{ error: 'no information was found about the provided video' },
			{ status: 404 }
		);

	return json(video_info);
}) satisfies RequestHandler;
