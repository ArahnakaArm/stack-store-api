const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const status = require('../utils/enum/status');
const cors = require('cors');
const whiteListReq = JSON.parse(process.env.whiteListReq);

/* ------------- [START IMPLEMENT] ------------ */
module.exports = () => {
    const app = express();
    app.set('case sensitive routing', true);
    app.use(bodyParser.json());

    const corsOptions = {
        origin: function (origin, callback) {
            if (whiteListReq.indexOf(origin) !== -1 || whiteListReq.indexOf('*') !== -1) {
                callback(null, true);
            } else {
                // eslint-disable-next-line node/no-callback-literal
                callback('Not allowed by CORS');
            }
        },
    };
    app.use(cors(corsOptions));

    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    app.use((req, res, next) => {
        const session = req.get('x-session-id') || '$session';
        /*  appLog = logHandle(session); */
        /*   log.sessionID = () => session; */

        next();
    });

    /*     const logResponseBody = (req, res, next) => {
        const oldWrite = res.write;
        const oldEnd = res.end;
        const chunks = [];
        res.write = (chunk) => {
            chunks.push(chunk);
            oldWrite.apply(res, arguments);
        };
        res.end = function (chunk) {
            let body = '';
            if (typeof chunk !== 'string' && !(chunk instanceof Buffer)) {
                oldEnd.apply(res, arguments);
                return;
            }
            if (!(chunk instanceof String || typeof chunk === 'string')) {
                chunks.push(chunk);
            }
            try {
                body = chunks.length > 0 ? Buffer.concat(chunks).toString('utf8') : '';
                res.body = body;
            } catch (error) {
                appLog.error(error);
            }
            oldEnd.apply(res, arguments);
        };
        next();
    }; */
    /*  app.use(logResponseBody); */

    /* ------------- [START LOAD API ROUTE] ------------ */
    /* log.info("LOAD MODULES .."); */
    const load = require('express-load');
    const cwdPath = path.join(__dirname, '..');

    load('modules', {
        cwd: cwdPath,
        checkext: true,
        extlist: ['service.js'],
    }).into(app);
    load('modules', {
        cwd: cwdPath,
        checkext: true,
        extlist: ['ctrl.js'],
    }).into(app);
    load('modules', {
        cwd: cwdPath,
        // verbose: true,
        checkext: true,
        extlist: ['route.js'],
    }).into(app);
    /* ------------- [END LOAD API ROUTE] ------------ */

    /* ------------- [START NOT MATCH ROUTE - 404 ] ------------ */
    app.all('*', (req, res) => {
        /*  log.debug(`Unknown URL=${req.originalUrl}`); */
        const resMessage = {
            resultCode: status.UNKNOWN_URL.RESULT_CODE,
            developerMessage: status.UNKNOWN_URL.DEVELOPER_MESSAGE,
        };
        res.body = resMessage;
        return res.status(404).send(resMessage);
    });
    /* ------------- [END NOT MATCH ROUTE - 404 ] ------------ */
    return app;
};
/* ------------- [END IMPLEMENT] ------------ */
