import fastify from 'fastify';
import ytdl from 'ytdl-core';
import z from 'zod';
import { downloadVideo, getVideoInfo } from './download';

const app = fastify();

app.get('/info/:urlCode', async (request, reply) => {
  const createSchema = z.object({
    urlCode: z.string(),
  });

  const { urlCode } = createSchema.parse(request.params);

  const videoInfo = await getVideoInfo(urlCode);

  console.log(videoInfo);

  return reply.status(200).send(videoInfo);
});

app.post('/download', async (request, reply) => {
  const createSchema = z.object({
    urlCode: z.string(),
  });

  const { urlCode } = createSchema.parse(request.body);

  const result = await downloadVideo(urlCode);

  return reply.status(200).send(result);
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server running on port 3333!');
  });
