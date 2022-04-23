const { Sequelize } = require('sequelize');
const { mysql } = typeof process.env.service === 'string' ? JSON.parse(process.env.service) : process.env.service;
/* const { postgres2 } = typeof process.env.service === "string" ? JSON.parse(process.env.service) : process.env.service;
const appConfig = require("../../conf/config-app.json");
const isPostgresSsl = appConfig.isPostgresSsl;
 */
let sequelize;
const dbLink = `mysql://${mysql.options.user}:${mysql.options.pass}@${mysql.ip}:${mysql.port}/${mysql.dbName}`;
// eslint-disable-next-line prefer-const
sequelize = new Sequelize(dbLink, {
    dialect: 'mysql',
    protocol: 'mysql',
    dialectOptions: {}, // removed ssl
    logging: false,
});

sequelize
    .authenticate()
    .then((v) => {
        console.log('Connection has been established successfully.');
    })
    .catch((e) => {
        console.error('Unable to connect to the database:', e);
    });

const Users = sequelize.define('users', require('./schema/User'), { timestamps: false, freezeTableName: true });

const Contacts = sequelize.define('contacts', require('./schema/Contact'), {
    timestamps: false,
    freezeTableName: true,
});
module.exports = {
    Contacts,
    Users,
    /*  sequelize,  */
};

sequelize.sync();
