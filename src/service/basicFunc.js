const randomize = require('randomatic');
module.exports.generateUserId = () => {
    return 'USER' + randomize('0', 12);
};
