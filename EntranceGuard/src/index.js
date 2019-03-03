'use strict';
var http = require('http');
// var net = require('net');

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

var options = {
    host: 'httpbin.org',
    path: '/post',
    method: 'POST',
    headers: {
    }
};

function postState(state) {
    options.headers['Content-Length'] = state.length;
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.write(state);
    req.end();
}

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    console.log('test');
    // //socket
    // var server = net.createServer();
    // server.on('connection', function(socket) {
    //     socket.on('data', function(data) {
    //         console.log(data.toString());
    //         socket.write('I am Server');
    //     });
    //     socket.on('close', function() {
    //         console.log('close');
    //     });
    // }).listen(7777);

    // server.on('listening', function() {
    //     console.log('server is listening port 7777');
    // })

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
        // $('#led-b').turnOn();
        postState('in InfraredInduction sound')

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


