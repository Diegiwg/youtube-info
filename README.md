# Youtube Info

> An API for the ytdl-core NPM package, with a simple web client

## Mode of Use

### API

- To use the API, just make an HTTP-GET call to the `/ytdl/info` link, supplying the query parameter `video_url`, with a valid youtube url.
- As a response, you will receive the json containing all the information collected about the provided video, or a 404 error, if there is an error in the request.

### Web Client

- To use the Web Client, just access the base link, provide a valid YouTube link, and click search.

## Technologies

- SvelteKit was used to provide automated deployment facility for the Netlify service.
- The SvelteKit Server system was used to run the ytdl.
