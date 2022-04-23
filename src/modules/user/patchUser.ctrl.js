const { Users } = require('../../models');
const status = require('../../utils/enum/status');

exports.updateFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    let resMessage = {};

    const body = req.body;
    const userId = req.params.id;

    const user = await Users.findOne({ where: { user_id: userId, deleted_at: null } });

    if (!user) {
        resMessage = {
            resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
            developerMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
        };
        return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    const now = new Date();

    const updateObj = { ...body, updated_at: now };

    user.set(updateObj);

    await user.save();

    resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
        resultData: user,
    };

    return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
};

exports.updateByMeFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    let resMessage = {};

    const body = req.body;
    const userId = body.userId;

    const user = await Users.findOne({ where: { user_id: userId, deleted_at: null } });

    if (!user) {
        resMessage = {
            resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
            developerMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
        };
        return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    const now = new Date();

    const updateObj = { ...body, updated_at: now };

    user.set(updateObj);

    await user.save();

    resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
        resultData: user,
    };

    return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
};
