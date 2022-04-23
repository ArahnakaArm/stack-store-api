const conf = require('../../../conf/config.json');
const validateAuth = require('../../service/auth');

module.exports = (app) => {
    // Routing
    const { auth } = conf.routing;

    // Ctrl
    const ctrl = app.modules.auth;

    // //GET

    // //POST
  /*   app.post(auth, ctrl.authLocalCtrl.authLocalFunc); */
};
