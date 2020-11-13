var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BCGLkyctdOQBfcmydnsWqYxU85ApPbwKdbERMx24awac8oNfh8xEetRpBUHslkM6gDdXelanM9MxjDEt8mRBiR4",
    "privateKey": "OFxkYnnL_FSrkZcYnjiida-Tqqn_Y_X-P9el4cEj9eo"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cnd4Wue6SnU:APA91bGc4I3BbP6258WmPnt1Uj2c472hG1QGKNxcrxm9_KO-IwO8QkGlpqVSvp8pyzIQBULcJSGqyj-8DKHydSirKATIeYr3quxvuxmCmJh2iIcpFp5asWLeEKui1bw8zqaUFF6ySgnh",
    "keys": {
        "p256dh": "BPg64N/yKuJ/LJxd3HkQOrPaMqoVroh3FpbgEfxf+ZRRaDmWppY0V/TaKowck7Pojtu+vlMohxrryGI4fTyBKxI=",
        "auth": "UIWOX1iWpc1sTLrS1BC26g=="
    }
};
var payload = 'Informasi Terbaik Bola Sepak Ada Disini.';
var options = {
    gcmAPIKey: '703233021309',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);