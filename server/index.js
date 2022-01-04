// modules
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const consola = require("consola");
const onFinished = require("on-finished");
const compression = require("compression");

// lib
const { winLogger, downloadFile, handleApiError } = require("../lib");

// const lib = require("../lib");
// console.log(lib);

// dbs -> databases
const { bimed } = require("../dbs");

// ep -> endpoint
const ep = require("../endpoints");

/*********************************************************************
  # mongodb connections:
    - use either of the connections (imed.local() or  bimed.atlas())
    - for multipe connections; further configurations are necessary
*********************************************************************/

// bimed.test.local();
// bimed.test.atlas();
// bimed.production.local();
bimed.production.atlas();
const app = express();

/***********************************************************************
  Middleware:
  # compression: to compress the response
  # json: parsing json
  # cors: configuration for response headers and cors restrictions
***********************************************************************/

// app level API logger
app.use((req, res, next) => {
  const { url, method, body, params, query, httpVersion, rawHeaders } = req;
  winLogger.httpREQ(
    `REQ:  [method: "${method}"]  [path: "${rawHeaders[1]}${url}"]  ${body ||
      ""}`
  );
  next();
  onFinished(req, (req, err) => {
    winLogger.httpRES(
      `RES: [method: "${method}"]  [path: "${
        rawHeaders[1]
      }${url}"]  [status code: "${res.statusCode}"] ${res.statusMessage ||
        ""} ${res.body ? res.body : ""}\n`
    );
  });
});

// # security with helmet
app.use(helmet());

// # compression
app.use(compression());

// # json
app.use(express.json({ extended: false }));

// # cors
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    return res.status(200).json({});
  }
  next();
});

/*************
  app Routes
*************/

// index/base
app.get("/", (req, res) => {
  res.send(
    "<h1 style='padding:50px; font-family:sans-serif'>Hello and Welcome to <span style='color:#1987fc'>BIMED</span> server !</h1>"
  );
});

/***********
  app APIs
***********/

app.use("/api/otp", ep.otp);
app.use("/api/faq", ep.faq);
app.use("/api/news", ep.news);
app.use("/api/nfpr", ep.nfpr);
app.use("/api/auth", ep.auth);
app.use("/api/user", ep.user);
app.use("/api/order", ep.order);
app.use("/api/utcar", ep.utcar);
app.use("/api/about", ep.about);
app.use("/api/banner", ep.banner);
app.use("/api/contact", ep.contact);
app.use("/api/medicine", ep.medicine);
app.use("/api/pharmacy", ep.pharmacy);
app.use("/api/feedback", ep.feedback);
app.use("/api/callOrder", ep.callOrder);

/*********************
  app fallback Route
*********************/

app.get("*", (req, res) =>
  res
    .status(404)
    .send(
      "<h1 style='padding:50px; font-family:sans-serif'> <span style='color:#db1d49'>404: </span> Sorry, the conent you are looking for is NOT found !</h1>"
    )
);

/******************************
  The backend.bimed.kg server
******************************/

class Server {
  static init(port) {
    app.listen(port, () => {
      winLogger.info(
        `server is running on port: ${port} | url: http://localhost:${port}`
      );
      consola.ready({
        message: `server is running on port: ${port}\t| url: http://localhost:${port}`,
        badge: true
      });
    });
  }
}

module.exports = { server: Server, app };
