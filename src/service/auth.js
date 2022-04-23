const status = require('../utils/enum/status');
const conf = require('../../conf/config.json');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
module.exports.auth = (isAuth = true) => {
    return async (req, res, next) => {
        const { jwtSecret } = conf;
        let resMessage = {};
        let token = '';
        try {
            token = req.headers.authorization.split(' ')[1];
        } catch (e) {
            resMessage = {
                resultDesc: status.UNAUTHORIZED.DEVELOPER_MESSAGE,
                resultCode: status.UNAUTHORIZED.RESULT_CODE,
            };
            return res.status(Number(status.UNAUTHORIZED.RESULT_CODE.slice(0, 3))).json(resMessage);
        }

        if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
            resMessage = {
                resultDesc: status.UNAUTHORIZED.DEVELOPER_MESSAGE,
                resultCode: status.UNAUTHORIZED.RESULT_CODE,
            };
            return res.status(Number(status.UNAUTHORIZED.RESULT_CODE.slice(0, 3))).json(resMessage);
        }
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const userId = decoded.user_id;
            const user = await Users.findOne({ where: { user_id: userId, deleted_at: null } });
            if (!user) {
                resMessage = {
                    resultDesc: status.UNAUTHORIZED.RESULT_DESC,
                    resultCode: status.UNAUTHORIZED.RESULT_CODE,
                    resultMessage: status.UNAUTHORIZED.Result_Message,
                };
                return res.status(Number(status.UNAUTHORIZED.RESULT_CODE.slice(0, 3))).json(resMessage);
            }
            req.body.userId = userId;
        } catch (err) {
            resMessage = {
                resultDesc: status.SYSTEM_ERROR.RESULT_DESC,
                resultCode: status.SYSTEM_ERROR.RESULT_CODE,
                resultMessage: status.SYSTEM_ERROR.Result_Message,
            };
            return res.status(Number(status.SYSTEM_ERROR.RESULT_CODE.slice(0, 3))).json(resMessage);
        }
        next();
    };
};
