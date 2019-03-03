'use strict';

// $.ready(function (error) {
//     if (error) {
//         console.log(error);
//         return;
//     }

//     // 在 `#button` 按下时点亮 `#led-r`.
//     $('#button').on('push', function () {
//         console.log('Button pushed.');
//         $('#led-r').turnOn();
//         $('#led-b').turnOn();
//         $('#led-g').turnOn();
//     });

//     // 在 `#button` 释放时熄灭 `#led-r`.
//     $('#button').on('release', function () {
//         console.log('Button released.');
//         $('#led-r').turnOff();
//         $('#led-b').turnOff();
//         $('#led-g').turnOff();
//     });
// });

// $.end(function () {
//     $('#led-r').turnOff();
// });

var http = require('http');

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

    $('#button').on('push', function() {
        console.log('Button pushed.');
        $('#led-r').turnOn(function() {
            postState('turn on');
        });
    });

    $('#button').on('release', function() {
        console.log('Button released.');
        $('#led-r').turnOff(function() {
            postState('turn off');
        });
    });
});

$.end(function () {
    $('#led-r').turnOff();
});
