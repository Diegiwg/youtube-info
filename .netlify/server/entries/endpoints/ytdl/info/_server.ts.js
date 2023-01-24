import ytdl from "ytdl-core";
import { j as json } from "../../../../chunks/index.js";
const POST = async ({ request }) => {
  const { video_url } = await request.json();
  const video_info = await ytdl.getInfo(video_url);
  return json(video_info);
};
export {
  POST
};
