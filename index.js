const handlers = require("./handlers");
const comments = require("./data");

const http = require("http");
const { getComments, getHTML, getText, onError, postComment, getHome } =
  handlers;

const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    return getHome(req, res);
  }

  if (req.method === "GET" && req.url === "/html") {
    return getHTML(req, res);
  }

  if (req.method === "GET" && req.url === "/text") {
    return getText(req, res);
  }

  if (req.method === "GET" && req.url === "/comments") {
    return getComments(req, res);
  }

  if (req.method === "POST" && req.url === "/comments") {
    return postComment(req, res);
  }

  return onError(req, res);
});

server.listen(PORT, () => {
  console.log(`server was launched on port ${PORT}`);
});
