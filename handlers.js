const comments = require("./data");
const fs = require("fs");
const qs = require("querystring");

function getHTML(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write("<html><body><div>");
  res.write("<h1>Greetings from HTTP SERVER</h1>");
  res.write("</div></body></html>");
  res.end();
}

function getHome(req, res) {
  fs.readFile("./files/comment-form.html", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Server error while loading HTML file");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
  });
}

function getText(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("<h2>This is my server! Enjoy!</h2>");
}

function getComments(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(comments));
}

function onError(req, res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Page not found!</h1>");
}

function postComment(req, res) {
  res.setHeader("Content-Type", "text/plain");
  if (req.headers["content-type"] === "application/json") {
    let comment = "";

    req.on("data", (chunk) => (comment += chunk));

    req.on("end", () => {
      try {
        comments.push(JSON.parse(comment));
        res.statusCode = 200;
        res.end("Comment data was received");
      } catch {
        res.statusCode = 400;
        res.end("Invalid JSON");
      }
    });
  }

  if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const comment = qs.parse(body);
        comments.push(comment);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write('<h1>Comment data was received</h1>');
        res.write('<a href="/">Submit one more comment<a/>')
        res.write('<br><a href="/comments">See comments<a/>');
        res.end();
      });
    } catch {
      res.statusCode = 400;
      res.end("Invalid JSON");
    }
  } else {
    res.statusCode = 400;
    res.end("Data must be in the JSON format");
  }
}

module.exports.getComments = getComments;
module.exports.getHTML = getHTML;
module.exports.getText = getText;
module.exports.onError = onError;
module.exports.postComment = postComment;
module.exports.getHome = getHome;
