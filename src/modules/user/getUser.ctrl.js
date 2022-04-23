const { Users } = require('../../models');
const BasicFunc = require('../../service/basicFunc');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const status = require('../../utils/enum/status');
const { Op } = require('sequelize');
exports.getAllFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    let resMessage = {};
    let queryPage = {};
    const querySearch = {};

    queryPage = {
        offset: Number(req.query.offset) || 0,
    };

    if (req.query.limit) {
        queryPage.limit = Number(req.query.limit);
    }

    /*   querySearch = {
        [Op.or]: [
            { firstname: { [Op.like]: '%' + req.query.search + '%' } },
            { lastname: { [Op.like]: '%' + req.query.search + '%' } },
        ],
    };
 */
    let users = [];
    let usersCount = 0;
    if (!req.query.search) {
        users = await Users.findAll({
            where: {
                [Op.or]: [{ user_type_id: 'ADMIN' }, { user_type_id: 'GEN_USER' }],
            },
            ...queryPage,
        });

        usersCount = await Users.count({
            where: {
                [Op.or]: [{ user_type_id: 'ADMIN' }, { user_type_id: 'GEN_USER' }],
            },
        });
    } else {
        users = await Users.findAll({
            where: {
                [Op.and]: [
                    { [Op.or]: [{ user_type_id: 'ADMIN' }, { user_type_id: 'GEN_USER' }] },
                    {
                        [Op.or]: [
                            { firstname: { [Op.like]: '%' + req.query.search + '%' } },
                            { lastname: { [Op.like]: '%' + req.query.search + '%' } },
                        ],
                    },
                ],
                /*    [Op.or]: [{ user_type_id: 'ADMIN' }, { user_type_id: 'GEN_USER' }], */
            },
            ...queryPage,
        });

        usersCount = await Users.count({
            where: {
                [Op.and]: [
                    { [Op.or]: [{ user_type_id: 'ADMIN' }, { user_type_id: 'GEN_USER' }] },
                    {
                        [Op.or]: [
                            { firstname: { [Op.like]: '%' + req.query.search + '%' } },
                            { lastname: { [Op.like]: '%' + req.query.search + '%' } },
                        ],
                    },
                ],
                /*    [Op.or]: [{ user_type_id: 'ADMIN' }, { user_type_id: 'GEN_USER' }], */
            },
        });
    }

    resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
        resultData: users,
        rowCount: usersCount,
    };

    return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
};

exports.getByIdFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    const userId = req.params.id;
    let resMessage = {};

    const user = await Users.findOne({ where: { user_id: userId, deleted_at: null } });

    if (!user) {
        resMessage = {
            resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
            developerMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
        };
        return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
        resultData: user,
    };

    return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
};

exports.getProfileFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    const userId = req.body.userId;

    let resMessage = {};

    const user = await Users.findOne({ where: { user_id: userId, deleted_at: null } });

    if (!user) {
        resMessage = {
            resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
            developerMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
        };
        return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
    }

    resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
        resultData: user,
    };

    return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage);
};
