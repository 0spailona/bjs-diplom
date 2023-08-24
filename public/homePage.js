'use strict';
//Logout
const logout = new LogoutButton();

function logoutCallback(result) {
    console.log(result);

    if (result.success) {
        location.reload();
    }
}

logout.action = () => ApiConnector.logout(logoutCallback);

//Get data profile
function currentCallback(result) {
    console.log(result);

    if (result.success) {
        ProfileWidget.showProfile(result.data);
    }
}

ApiConnector.current(currentCallback);

// Get current exchange rates

const ratesBoardNow = new RatesBoard();

function getStocksCallback(result) {
    console.log(result);

    if (result.success) {
        ratesBoardNow.clearTable();
        ratesBoardNow.fillTable(result.data);
    }
}

function getCurrentExchangeRates() {
    ApiConnector.getStocks(getStocksCallback);
}

getCurrentExchangeRates();
setInterval(getCurrentExchangeRates, 60000);

//Money transactions

const moneyMng = new MoneyManager();

// Add money

function func(result) {
    console.log(result);
    if (result.success) {
        ProfileWidget.showProfile(result.data);
        moneyMng.setMessage(true, 'Баланс успешно пополнен');
    } else {
        moneyMng.setMessage(false, result.error || "Неизвестная ошибка");
    }
}

moneyMng.addMoneyCallback = data => ApiConnector.addMoney(data, func);

//Convert money
function convertMoneyCallback(result) {
    console.log(result);
    if (result.success) {
        ProfileWidget.showProfile(result.data);
        moneyMng.setMessage(true, 'Конвертирование валюты прошло успешно');
    } else {
        moneyMng.setMessage(false, result.error || "Неизвестная ошибка");
    }
}

moneyMng.conversionMoneyCallback = data => ApiConnector.convertMoney(data, convertMoneyCallback);

//Transfer Money

function transferMoneyCallback(result) {
    console.log(result);
    if (result.success) {
        ProfileWidget.showProfile(result.data);
        moneyMng.setMessage(true, 'Перевод валюты прошёл успешно');
    } else {
        moneyMng.setMessage(false, result.error || "Неизвестная ошибка");
    }
}

moneyMng.sendMoneyCallback = data => ApiConnector.transferMoney(data, transferMoneyCallback);

// FavoritesWidgets

const favoritesWidget = new FavoritesWidget();

//Get Favorites list
function getFavoritesCallback(result) {
    console.log(result);
    if (result.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
        moneyMng.updateUsersList(result.data);
    }
}

ApiConnector.getFavorites(getFavoritesCallback);

// Add favourite
function addUserToFavoritesCallback(result) {
    console.log(result);
    if (result.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
        moneyMng.updateUsersList(result.data);
        favoritesWidget.setMessage(true, 'Пользователь успешно добавлен');
    } else {
        favoritesWidget.setMessage(false, result.error || "Неизвестная ошибка");
    }
}

favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, addUserToFavoritesCallback);

// Delete from favourites

function removeUserFromFavoritesCallback(result) {
    console.log(result);
    if (result.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
        moneyMng.updateUsersList(result.data);
        favoritesWidget.setMessage(true, 'Пользователь успешно удалён');
    } else {
        favoritesWidget.setMessage(false, result.error || "Неизвестная ошибка");
    }
}

favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, removeUserFromFavoritesCallback);