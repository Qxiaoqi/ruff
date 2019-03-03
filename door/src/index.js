'use strict';
var http = require('http');

// var net = require('net');

// var content = qs.stringify({
//     isTake: true
// })

/** LCD显示器 */
var lcd;
/** 继电器 */
var relay;
/** 按键开关 */
var button;
/** 红外人体感应器 */
// var infraredSensor;
/** 声音传感器 */
var soundSensor;

// var options = {
//     host: '127.0.0.1',
//     port: 8888,
//     path: '/image/take' + '?' + content,
//     method: 'GET',
// };

// function postState() {
//     // options.headers['Content-Length'] = state.length;
//     var req = http.request(options, function(res) {
//         res.on('data', function (data) {
//             console.log('BODY: ' + data);
//             console.log(data.toString());
//         });
//     });

//     // req.write(state);
//     req.end();
// }

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var httpGet = require('../client');

    console.log('test');

    lcd = $('#lcd');
    relay = $('#relay');
    button = $('#button');
    // infraredSensor = $('#infrared-induction');
    soundSensor = $('#sound');

    soundSensor.on('sound', function () {
        //如果红外人体感应检测到人
        // console.log('in InfraredInduction sound');
        lcd.clear();
        //屋内的LCD显示屏提示屋外有人
        lcd.print('people outside');
        console.log('有人');
        //有人则亮蓝灯
        $('#led-b').turnOn();
        // postState();
        httpGet.httpTest();

        //若3秒钟内没有声音，则关闭继电器
        setTimeout( function () {
            lcd.clear();
            $('#led-b').turnOff();
        }, 3000);
    });

    button.on('push', function () {
        console.log('in button key push');
        relay.turnOn();
        lcd.clear();
        //LCD显示门正在打开中
        lcd.print('opening the door.');
    });

    button.on('release', function () {
        console.log('in button key release');
        relay.turnOff();
        lcd.clear();
        //LCD显示门正在关闭
        lcd.print('shutting the door');
    });

    // infraredSensor.on('absence', function () {
    //     console.log('in InfraredInduction absence');
    //     lcd.clear();
    //     //LCD显示屋外没有人
    //     lcd.print('no people outside');
    // });

});

$.end(function () {
    relay.turnOff();
    lcd.turnOff();
});


