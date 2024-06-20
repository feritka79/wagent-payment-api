import enforceEnv from 'envil';

const checkEnvs = ()=>{
    const envs=[
        'DB_URI',
        'DB_NAME',
        'PORT',
        'JWT_SECRET',
        'EMAIL_HOST',
        'EMAIL_PORT',
    ];
    enforceEnv(envs)

};
export default checkEnvs;