'use strict';
var http = require('http');

/** LCD显示器 */
// var lcd;
/** 光线传感器 */
var lightSensor;
/** LCD显示器 */
// var lcd;
/** 控制空调的继电器 */
// var temperatureRelay;
/** 控制加湿器的继电器 */
// var humidityRelay;
/** 温度湿度传感器 */
var dht;

var timer;

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

    dht = $('#DHT11');
    // lcd = $('#lcd');
    lightSensor = $('#GY-30');
    //人体舒适温度上限
    var temperatureUpperBound = 25;
    //人体舒适温度下限
    var temperatureLowerBound = 20;
    //人体舒适湿度上限
    var humidityUpperBound = 70;
    //人体舒适湿度下限
    var humidityLowerBound = 40;
    //每1秒更新一次光照强度

    setInterval(showLightIntensity, 1000);

    timer = setInterval(function () {
        // lcd.clear();

        dht.getTemperature(function (error, temperature) {
            if (error) {
                console.error(error);
                return;
            }
            // lcd.print('Temprature: ' + temperature);
            // console.log('Temperature: ', temperature);
            //如果温度高于温度上限，则打开控制空调的继电器
            // if (temperature > temperatureUpperBound) {
            //     temperatureRelay.turnOn();
            // } else if (temperature < temperatureLowerBound) {
            //     //如果温度低于温度下限，则关闭继电器
            //     temperatureRelay.turnOff();
            // }
            console.log('temperature:' + temperature);
            });

        dht.getRelativeHumidity(function (error, humidity) {
            if (error) {
                console.error(error);
                return;
            }
            // lcd.setCursor(0, 1);
            // lcd.print('Humidity: ' + humidity);
            console.log('Humidity: ', humidity);
            //如果湿度低于湿度下限,则控制打开加湿器的继电器
            // if (humidity < humidityLowerBound) {
            //     humidityRelay.turnOn();
            // } else if (humidity > humidityUpperBound) {
            //     //如果温度高于湿度上限，则关闭继电器
            //     humidityRelay.turnOff();
            // }
            console.log('humidity' + humidity);
            });
    }, 5000);
});

function showLightIntensity() {
    // console.log('函数运行');
    //从光照传感器获取光照强度
    lightSensor.getIlluminance(function (error, value) {
        if (error) {
            console.error(error);
            return;
        }
        console.log('illuminance: ' + value);
        // postState(value);
        // lcd.print('illuminance: ' + value);
    });
}

$.end(function () {
    // lcd = $('#lcd');
    // lcd.turnOff();
});