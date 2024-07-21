// regexValidations.js

const validateName = (name) => {
    const regexName = /^[a-zA-Z]{2,30}$/;
    return regexName.test(name);
};

const validateEmail = (email) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email.toLowerCase());
};

const validatePassword = (password) => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
    return regexPassword.test(password);
};

const validateUsername = (username) => {
    const regexUsername = /^[a-zA-Z0-9_]{3,20}$/;
    return regexUsername.test(username);
};

const validateImageUrl = (url) => {
    const regexImageUrl = /\.(jpg|jpeg|png)$/i;
    return regexImageUrl.test(url);
};

const validatePrice = (price) => {
    return parseFloat(price) >= 0;
};

export {
    validateName,
    validateEmail,
    validatePassword,
    validateUsername,
    validateImageUrl,
    validatePrice
};