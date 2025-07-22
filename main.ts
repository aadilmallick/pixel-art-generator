import { Hono } from "jsr:@hono/hono";
import { generatePixelArt, generateIcon } from "./services/geminiService.ts";
import { serveStatic } from "npm:@hono/node-server/serve-static";

const app = new Hono();

// Serve static files from frontend/dist
// @ts-ignore
app.use("/*", serveStatic({ root: "./frontend/dist" }));

// API route for pixel art generation
app.post("/api/generate/pixel-art", async (c) => {
  const { prompt } = await c.req.json();
  try {
    const image = await generatePixelArt(prompt);
    return c.json({ image });
  } catch (e) {
    return c.json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});

// API route for icon generation
app.post("/api/generate/icon", async (c) => {
  const { prompt } = await c.req.json();
  try {
    const image = await generateIcon(prompt);
    return c.json({ image });
  } catch (e) {
    return c.json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});

Deno.serve(app.fetch);
