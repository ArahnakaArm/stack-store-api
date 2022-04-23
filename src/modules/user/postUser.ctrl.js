const { Users } = require('../../models');
const BasicFunc = require('../../service/basicFunc');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const status = require('../../utils/enum/status');
const { password } = require('../../models/schema/User');
const conf = require('../../../conf/config.json');
const jwt = require('jsonwebtoken');
const validate = require('../../service/validate');

exports.registerFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    let resMessage = {};

    const body = req.body;

    const validateBody = validate.registerSchema(body);
    if (validateBody) {
        resMessage = {
            resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
            developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
        };
        return res.status(400).send(resMessage);
    }

    const userId = BasicFunc.generateUserId();
    const hashedPass = bcrypt.hashSync(body.password, saltRounds);

    const conflict = await Users.findOne({ where: { email: body.email, deleted_at: null } });

    if (conflict) {
        resMessage = {
            resultCode: status.CONFLICT.RESULT_CODE,
            developerMessage: status.CONFLICT.DEVELOPER_MESSAGE,
        };
        return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    await Users.create({
        user_id: userId,
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: hashedPass,
        phonenumber: body.phone_number,
        user_type_id: body.user_type_id,
        user_state_id: 'ACTIVED',
        show_in_list: 1,
    });

    resMessage = {
        resultCode: status.CREATED.RESULT_CODE,
        developerMessage: status.CREATED.DEVELOPER_MESSAGE,
    };

    return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
};

exports.loginFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    let resMessage = {};

    const body = req.body;

    const validateBody = validate.loginSchema(body);
    if (validateBody) {
        resMessage = {
            resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
            developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
        };
        return res.status(400).send(resMessage);
    }

    const email = body.email;
    const password = body.password;

    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
        resMessage = {
            resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
            developerMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
        };

        return res.status(Number(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    const isCorrect = bcrypt.compareSync(password, user.password);

    if (!isCorrect) {
        resMessage = {
            resultCode: status.WRONG_PASSWORD.RESULT_CODE,
            developerMessage: status.WRONG_PASSWORD.DEVELOPER_MESSAGE,
        };
        return res.status(Number(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    const { jwtSecret } = conf;

    const token = jwt.sign({ user_id: user.user_id }, jwtSecret);

    resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
        resultData: { access_token: token },
    };

    return res.status(Number(resMessage.resultCode.substring(0, 3))).send(resMessage);
};

exports.resetPasswordFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    let resMessage = {};
    const body = req.body;

    const validateBody = validate.resetPassSchema(body);

    if (validateBody) {
        resMessage = {
            resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
            developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
            validateBody: validateBody,
        };
        return res.status(400).send(resMessage);
    }

    const oldPass = body.password;
    const userId = body.userId;
    const newPass = body.new_password;

    const user = await Users.findOne({ where: { user_id: userId, deleted_at: null } });

    const isCorrect = bcrypt.compareSync(oldPass, user.password);

    if (!isCorrect) {
        resMessage = {
            resultCode: status.WRONG_PASSWORD.RESULT_CODE,
            developerMessage: status.WRONG_PASSWORD.DEVELOPER_MESSAGE,
        };
        return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    const hashedPass = bcrypt.hashSync(newPass, saltRounds);

    user.password = hashedPass;
    user.save();

    resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };

    return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
};

exports.resetPasswordByIdFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    let resMessage = {};
    const userId = req.params.id;

    const newPass = 'password';

    const user = await Users.findOne({ where: { user_id: userId, deleted_at: null } });

    if (!user) {
        resMessage = {
            resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
            developerMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
        };

        return res.status(Number(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    const hashedPass = bcrypt.hashSync(newPass, saltRounds);

    user.password = hashedPass;
    user.save();

    resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };

    return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
};
