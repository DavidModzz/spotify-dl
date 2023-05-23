var express = require('express')
var cors = require('cors')
var secure = require("ssl-express-www");
const { log } = require("logpalette");

const PORT = process.env.PORT || 8080;

var mainrouter = require("./apis");

var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(secure);

app.use("/", mainrouter);

app.listen(PORT, () => {
  log(
    `Server reay on port: ${PORT}`
  , 'info');
});

module.exports = app;
