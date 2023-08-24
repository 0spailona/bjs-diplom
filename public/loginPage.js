'use strict';

//Login form
const userForm = new UserForm();
function onLoginResult(result)
{
    console.log(result);

    if (result.success) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage(result.error || "Неизвестная ошибка");
    }
}


userForm.loginFormCallback = data => ApiConnector.login(data, onLoginResult);

//Register form
function onRegisterResult(result)
{
    console.log(result);

    if (result.success) {
        location.reload();
    } else {
        userForm.setRegisterErrorMessage(result.error || "Неизвестная ошибка");

    }
}

userForm.registerFormCallback = data => ApiConnector.register(data, onRegisterResult);
