import ytdl from 'ytdl-core';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	const { video_url } = await request.json();
	const video_info = await ytdl.getInfo(video_url);

	return json(video_info);
}) satisfies RequestHandler;
