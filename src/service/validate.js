const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

ajv.addKeyword('emptyChecker', {
    modifying: false,
    schema: false, // keywords value is not used, can be true
    validate: function (data, dataPath, parentData, parentDataProperty) {
        return data !== '' && data != null;
    },
});

exports.registerSchema = (body) => {
    const schema = {
        type: 'object',
        required: ['firstname', 'lastname', 'email', 'password', 'user_type_id', 'phone_number'],
        additionalProperties: false,
        properties: {
            firstname: {
                emptyChecker: true,
                type: 'string',
            },
            lastname: {
                emptyChecker: true,
                type: 'string',
            },
            email: {
                emptyChecker: true,
                type: 'string',
            },
            password: {
                emptyChecker: true,
                type: 'string',
            },
            user_type_id: {
                emptyChecker: true,
                type: 'string',
            },
            phone_number: {
                emptyChecker: true,
                type: 'string',
            },
        },
    };
    const validateBody = ajv.validate(schema, body);
    if (validateBody) {
        /*    appLog.debug("VALIDATE SUCCESS"); */
    } else {
        const validateError = ajv.errorsText();
        /*      appLog.error({err: validateError}); */
        return validateError;
    }
};

exports.loginSchema = (body) => {
    const schema = {
        type: 'object',
        required: ['email', 'password'],
        additionalProperties: false,
        properties: {
            email: {
                emptyChecker: true,
                type: 'string',
            },
            password: {
                emptyChecker: true,
                type: 'string',
            },
        },
    };
    const validateBody = ajv.validate(schema, body);
    if (validateBody) {
        /*    appLog.debug("VALIDATE SUCCESS"); */
    } else {
        const validateError = ajv.errorsText();
        /*      appLog.error({err: validateError}); */
        return validateError;
    }
};

exports.resetPassSchema = (body) => {
    const schema = {
        type: 'object',
        required: ['password', 'new_password'],
        additionalProperties: true,
        properties: {
            password: {
                emptyChecker: true,
                type: 'string',
            },
            new_password: {
                emptyChecker: true,
                type: 'string',
            },
        },
    };
    const validateBody = ajv.validate(schema, body);
    if (validateBody) {
        /*    appLog.debug("VALIDATE SUCCESS"); */
    } else {
        const validateError = ajv.errorsText();
        /*      appLog.error({err: validateError}); */
        return validateError;
    }
};
