/**
 * Created by ArtemRomanov on 24.05.2017.
 */

//$('#load').on('click', checkMessage());
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

function checkMessage() {
        sendRequest('messages.get', {count: '1', filters: '0'}, function (data) {
            var html = '';
            var user_name = '';

            checkOnline();
            if (online == 1) {
                for (var i = data.response.length - 1; i > 0; i--) {
                    if (data.response[i].read_state == 0) {
                        var id_mes = data.response[i].mid;
                        var id_user = data.response[i].uid;
                        var text_mes = data.response[i].body;
                        html += '<li>' + id_mes + ' ' + id_user + ' ' + text_mes + '</li>';

                        identifyUsername(id_user);
                        sendMessage(id_user);
                        readMessage(id_mes);
                    }
                }
                $('ul').html(html);
            }
        });

        time += 10;
        $('p').html('Time(sec): ' + time);
}
setInterval(checkMessage, 10 * 1000);

function readMessage(id_mes) {
    sendRequest('messages.markAsRead', {message_ids: id_mes}, function () {
        console.log('Сообщение прочитано ' + user_name);
    });
}

function sendMessage(id_user) {
    var message = 'Привет ' + user_name + ' я сейчас офлайн!';
    sendRequest('messages.send', {user_id: id_user, message: message}, function () {
        console.log('Сообщение отправлено ' + user_name);
    });
}

function identifyUsername(id) {
    sendRequest('users.get', {user_ids: id}, function (data) {
        user_name = data.response[0].first_name;
    });
}