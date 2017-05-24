/**
 * Created by ArtemRomanov on 24.05.2017.
 */

$.ajax({
    url: 'https://api.vk.com/method/friends.search?count=60&fields=photo_100&access_token=bac05b6be300346ed88a2aaa5ac26939b327ec9c5f8d966507a8b62432251a8706ad4660237b911d170c8&expires_in=0&user_id=119397727&v=5.52',
    method: 'GET',
    dataType: 'JSONP',
    success: function (data) {
        console.log(data);
    }
});