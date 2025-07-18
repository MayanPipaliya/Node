const http = require("http");
require("dotenv").config();

const port = process.env.PORT || 9000;

const routes = {
  "/": "Welcome To Home Page !!",
  "/about": "Welcome To About Page !!",
  "/contact": "Welcome To Contact Page !!",
};

const server = http.createServer((req, res) => {
  const message = routes[req.url];
  if (message) {
    res.write(message);
  } else {
    res.writeHead(404);
    res.write("404 Page Not Found !!");
  }
  res.end();
});

server.listen(port, (err) => {
  if (!err) console.log(`Server started on PORT: ${port}`);
});
