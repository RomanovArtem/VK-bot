/**
 * Created by ArtemRomanov on 24.05.2017.
 */

$('#load').on('click', checkOffline());

function getUrl(method, params) {
    if (!method) throw new Error('Не указан метод');
    params = params || {};
    params['access_token'] = 'bac05b6be300346ed88a2aaa5ac26939b327ec9c5f8d966507a8b62432251a8706ad4660237b911d170c8';
    return 'https://api.vk.com/method/' + method + '?' + $.param(params);
}

function sendRequest(method, params, func) {
    $.ajax({
        url: getUrl(method, params),
        method: 'GET',
        dataType: 'JSONP',
        success: func
    });
}

function checkOffline() {
    sendRequest('users.get', {user_ids: '119397727', fields: 'online'}, function (data) {
        console.log(data);
        console.log(data.response[0].online);
    });
}

