var PUSH_GCM_SENDER_ID='36357833183';
var SERVER_URL = 'http://192.168.25.25:8000/';


/*
 *  Push Plugin 
 */
var pushNotification;

function pushSuccessHandler (result) {
    console.log('push result = ' + result);
};

function pushErrorHandler (error) {
    console.log('push error = ' + error);
};

function pushTokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    //console.log('device token = ' + result);
};


// Called on iOS Push Message
function onNotificationAPN (event) {
    if ( event.alert )
    {
        navigator.notification.alert(event.alert);
    }
};


function sendPushRegisterId(reg_id, device_type){
    // Envia a chave para nosso servidor após registrar no GCM
    var url = SERVER_URL + 'api-copa/register-push-device/';

    var data = 'reg_id=' + reg_id;
    data += '&device_type=' + device_type;
    data += '&language=' + window.localStorage.getItem('language', '1');
    
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(data);
};


// Called on Android Push Message
function onNotificationGCM(e) {
    switch( e.event ) {
        case 'registered':
            if ( e.regid.length > 0 ) {
                sendPushRegisterId(e.regid, 'android');
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
            }
            break;
        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if ( e.foreground ) {
                // if the notification contains a soundname, play it.
                var my_media = new Media("/android_asset/www/"+e.soundname);
                my_media.play();
            } else {  
                // otherwise we were launched because the user touched a notification in the notification tray.
                if ( e.coldstart ) {
                    //alert('<li>--COLDSTART NOTIFICATION--' + '</li>');
                } else {
                  //alert('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }
            };
            alert(e.payload.message);
            //alert('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            break;
        case 'error':
            console.log('ERROR -> MSG:' + e.msg);
            break;

        default:
            console.log('Unknown event' + e.event);
            break;
        }
};




var setup_push_plugin =  function(){
    pushNotification = window.plugins.pushNotification;
    
    if ( device.platform == 'android' || device.platform == 'Android' ) {
        pushNotification.register(
                pushSuccessHandler,
                pushErrorHandler, {
                    'senderID': PUSH_GCM_SENDER_ID,
                    'ecb': 'onNotificationGCM'
                });
        }
        else {
            pushNotification.register(
                pushTokenHandler,
                pushErrorHandler, {
                    "badge":"true",
                    "sound":"true",
                    "alert":"true",
                    "ecb":'onNotificationAPN'
                });
        };
    };