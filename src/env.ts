import enforceEnv from 'envil';

const getEnvs = () => {
    const envVariables = [
        'DB_URI',
        'DB_NAME',
        'PORT',
        'JWT_SECRET',
        'EMAIL_HOST',
        'EMAIL_PORT',
    ];
    const envValues = enforceEnv(envVariables, {returnValues: true});
    return envValues;

};
export default getEnvs;