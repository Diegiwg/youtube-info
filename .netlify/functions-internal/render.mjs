import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		entry: {"file":"_app/immutable/start-c564a1c0.js","imports":["_app/immutable/start-c564a1c0.js","_app/immutable/chunks/index-cdb4327e.js","_app/immutable/chunks/singletons-02237129.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/ytdl/info",
				pattern: /^\/ytdl\/info\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../server/entries/endpoints/ytdl/info/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
