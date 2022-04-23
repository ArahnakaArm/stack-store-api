const { User } = require('../../models');
exports.contactFunc = async (req, res) => {
    /* const contacts = await Contacts.findAll(); */
    return res.status(200).send('auth');
};
