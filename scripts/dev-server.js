const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const port = Number(process.env.PORT || 8000);
const host = "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    try {
      const url = decodeURIComponent((req.url || "/").split("?")[0]);
      const file = path.normalize(
        path.join(root, url === "/" ? "index.html" : url)
      );

      if (!file.startsWith(root)) {
        res.writeHead(403);
        return res.end("Forbidden");
      }

      fs.stat(file, (err, stat) => {
        if (err || !stat.isFile()) {
          res.writeHead(404);
          return res.end("Not found");
        }

        res.writeHead(200, {
          "Content-Type": types[path.extname(file)] || "application/octet-stream",
        });
        fs.createReadStream(file).pipe(res);
      });
    } catch (error) {
      res.writeHead(500);
      res.end(String(error));
    }
  })
  .listen(port, host, () => {
    console.log(`Local: http://${host}:${port}/index.html`);
    console.log(`Auth:  http://${host}:${port}/auth.html`);
    console.log(`Stats: http://${host}:${port}/stats.html`);
  });
