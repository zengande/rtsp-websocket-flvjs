const express = require("express");
const logger = require('./services/logger');
const expressWebSocket = require("express-ws");
const lives = require('./services/lives');

const port = 3000

let app = express();
expressWebSocket(app, null, {
    perMessageDeflate: true
});
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    next();
});
app.use(express.static("public"));
app.listen(port);
logger.info("Web server started! on port: ", port)

app.ws('/lives/:organization_code/:place_code/:monitor_id', lives.handle);