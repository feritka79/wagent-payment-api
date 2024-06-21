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
    return enforceEnv(envVariables, {returnValues: true});

};
export default getEnvs;