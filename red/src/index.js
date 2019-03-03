'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    $('#IRT-01').send(data, function (error) {
        if (error) {
            console.error(error);
            return;
        }
    
        console.log('data sent');
    });

    $('#IRT-01').on('data', function(data) {
        console.log('received data', data);
    });
});

$.end(function () {
    // $('#IRT-01').turnOff();
});
