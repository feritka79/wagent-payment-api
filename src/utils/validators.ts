const validator = require('validator');

export const validateEmail = (email:string): boolean=>{
    return validator.isEmail(email);
};

export const validatePassword = (password: string): boolean=>{
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
};