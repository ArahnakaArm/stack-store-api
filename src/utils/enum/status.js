module.exports = Object.freeze({
    SUCCESS: {
        RESULT_CODE: '20000',
        DEVELOPER_MESSAGE: 'Success',
    },
    CREATED: {
        RESULT_CODE: '20100',
        DEVELOPER_MESSAGE: 'Created',
    },
    MISSING_OR_INVALID_PARAMETER: {
        RESULT_CODE: '40000',
        DEVELOPER_MESSAGE: 'Missing or invalid parameter',
    },
    BAD_REQUEST: {
        RESULT_CODE: '40001',
        DEVELOPER_MESSAGE: 'Bad request',
    },
    INVALID_PERIOD_CODE: {
        RESULT_CODE: '40002',
        DEVELOPER_MESSAGE: 'Invalid period code',
    },
    UNAUTHORIZED: {
        RESULT_CODE: '40100',
        DEVELOPER_MESSAGE: 'Unauthorized',
    },
    ACCESS_DENIED: {
        RESULT_CODE: '40101',
        DEVELOPER_MESSAGE: 'Access denied',
    },
    WRONG_PASSWORD: {
        RESULT_CODE: '40101',
        DEVELOPER_MESSAGE: 'Wrong Password',
    },
    NOT_ALLOWED: {
        RESULT_CODE: '40102',
        DEVELOPER_MESSAGE: 'Not Allowed',
    },
    INVALID_CREDENTIALS: {
        RESULT_CODE: '40106',
        DEVELOPER_MESSAGE: 'Invalid credentials',
    },
    FORBIDDEN: {
        RESULT_CODE: '40300',
        DEVELOPER_MESSAGE: 'Forbidden',
    },
    DATA_EXIST: {
        RESULT_CODE: '40301',
        DEVELOPER_MESSAGE: 'Data exist',
    },
    UNKNOWN_URL: {
        RESULT_CODE: '40400',
        DEVELOPER_MESSAGE: 'Unknown URL',
    },
    DATA_NOT_FOUND: {
        RESULT_CODE: '40401',
        DEVELOPER_MESSAGE: 'Data not found',
    },
    CONFLICT: {
        RESULT_CODE: '40900',
        DEVELOPER_MESSAGE: 'Conflict',
    },
    SYSTEM_ERROR: {
        RESULT_CODE: '50000',
        DEVELOPER_MESSAGE: 'System error',
    },
    SERVER_BUSY: {
        RESULT_CODE: '50300',
        DEVELOPER_MESSAGE: 'Server busy',
    },
    SERVER_UNAVAILABLE: {
        RESULT_CODE: '50301',
        DEVELOPER_MESSAGE: 'Server unavailable',
    },
});
