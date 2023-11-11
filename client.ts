import { eventHandler } from "vinxi/server";

export default eventHandler(() => {
  return new Response(
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SPA</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="app"></div>
        <script src="./app/index.tsx" type="module"></script>
      </body>
    </html>
  `,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
});
