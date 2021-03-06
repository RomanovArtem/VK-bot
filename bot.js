/**
 * Created by ArtemRomanov on 24.05.2017.
 */

$('#stop').click(function() {
    clearInterval(timerId);
});

$('#reload').click(function() {
   location.reload();
});

var time = 0;

var online = 0;
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

function checkOnline() {
    sendRequest('users.get', {user_ids: '119397727', fields: 'online'}, function (data) {
        online = data.response[0].online;
    });
}
var user_name = '';
function checkMessage() {
        sendRequest('messages.get', {count: '10', filters: '0'}, function (data) {
            var html = '';
            checkOnline();
            if (online == 0) {
                for (var i = 1; i < data.response.length; i++) {
                    if (data.response[i].read_state == 0 && data.response[i].chat_id == undefined) {
                        console.log(data);

                        var id_mes = data.response[i].mid;
                        var id_user = data.response[i].uid;
                        var text_mes = data.response[i].body;
                        html += '<li>' + id_mes + ' ' + id_user + ' ' + text_mes + '</li>';

                        identifyUsername(id_user, id_mes);
                    }
                }
                $('ul').html(html);
            }
        });

        time += 10;
        $('p').html('Time(sec): ' + time);
}
var timerId = setInterval(checkMessage, 30 * 1000);

function identifyUsername(id_user, id_message) {
    sendRequest('users.get', {user_ids: id_user}, function (data) {
        user_name = data.response[0].first_name;
        readMessage(id_message);
        sendMessage(id_user);
    });
}

function readMessage(id_message) {
    sendRequest('messages.markAsRead', {message_ids: id_message}, function () {
        console.log('Сообщение прочитано ');
    });
}

function sendMessage(id_user) {
    var message = 'Здравствуйте ' + user_name + ' я сейчас офлайн. Напишите позже!';
    sendRequest('messages.send', {user_id: id_user, message: message}, function () {
        console.log('Сообщение отправлено ' + user_name);
    });
}