require('./src/models');
const fs = require('fs');
const http = require('http');
const https = require('https');
const expressConf = require('./src/config/express');
const app = expressConf();

/* ------------- [START INITIAL APPLICATION] ------------ */
if (process.env.use_https === 'true') {
    const privateKey = fs.readFileSync(process.env.key);
    const certificate = fs.readFileSync(process.env.cert);
    console.log(privateKey, certificate);
    const options = {
        key: privateKey,
        cert: certificate,
    };
    options.rejectUnauthorized = false;
    https.createServer(options, app).listen(process.env.app_port);
} else {
    http.createServer(app).listen(process.env.app_port);
    console.log(`Server start at port ${process.env.app_port}`);
}
/* ------------- [END INITIAL APPLICATION] ------------ */

module.exports = app;
