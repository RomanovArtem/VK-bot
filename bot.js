/**
 * Created by ArtemRomanov on 24.05.2017.
 */

function getUrl(method, params) {
    if (!method) throw new Error('Не указан метод');
    params = params || {};
    params['access_token'] = 'bac05b6be300346ed88a2aaa5ac26939b327ec9c5f8d966507a8b62432251a8706ad4660237b911d170c8';
    return 'https://api.vk.com/method/' + method + '?' + $.param(params);
}

function sendRequest(method, params) {
    $.ajax({
        url: getUrl('friends.search', {count: 60, fields: 'photo_100'}),
        method: 'GET',
        dataType: 'JSONP',
        success: function (data) {
            console.log(data);
        }
    });
}

