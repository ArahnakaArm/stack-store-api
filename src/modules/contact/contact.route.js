const conf = require('../../../conf/config.json');
const validateAuth = require('../../service/auth');

module.exports = (app) => {
    // Routing
    const { contact } = conf.routing;

    // Ctrl
    const ctrl = app.modules.contact;

    // //GET
    app.get(contact, validateAuth.auth(), ctrl.getContactCtrl.contactFunc);
};
