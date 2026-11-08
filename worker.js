export default {
  async fetch(request, env) {
    const p = new URL(request.url).pathname;
    if (p !== "/" && p !== "/index.html") return new Response("Not found", { status: 404 });
    const obj = await env.BUCKET.get("index.html");
    if (!obj) return new Response("Missing file", { status: 500 });
    return new Response(obj.body, {
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=3600" },
    });
  },
};
