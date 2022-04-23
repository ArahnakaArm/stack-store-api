const conf = require('../../../conf/config.json');
const validateAuth = require('../../service/auth');

module.exports = (app) => {
    // Routing
    const {
        register,
        getUser,
        getUserById,
        resetPass,
        login,
        updateUserById,
        getUserProfile,
        resetPassById,
        updateUserByMe,
    } = conf.routing;

    // Ctrl
    const ctrl = app.modules.user;

    // //GET
    app.get(getUser, ctrl.getUserCtrl.getAllFunc);
    app.get(getUserById, ctrl.getUserCtrl.getByIdFunc);
    app.get(getUserProfile, validateAuth.auth(), ctrl.getUserCtrl.getProfileFunc);
    // //POST
    app.post(register, ctrl.postUserCtrl.registerFunc);
    app.post(resetPass, validateAuth.auth(), ctrl.postUserCtrl.resetPasswordFunc);
    app.post(login, ctrl.postUserCtrl.loginFunc);
    app.post(resetPassById, validateAuth.auth(), ctrl.postUserCtrl.resetPasswordByIdFunc);

    // //PATCH
    app.patch(updateUserById, ctrl.patchUserCtrl.updateFunc);
    app.patch(updateUserByMe, validateAuth.auth(), ctrl.patchUserCtrl.updateByMeFunc);
};
