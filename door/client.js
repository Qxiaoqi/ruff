exports.httpTest = function () {
    var http = require('http');
    var qs = require('querystring');
    
    var content = qs.stringify({
        isTake: true
    })
    
    var options = {
        host: '127.0.0.1',
        port: 8888,
        path: '/image/take' + '?' + content,
        method: 'GET',
    };
    
    
    var req = http.request(options, function(res) {
        res.on('data', function (data) {
            console.log(data.toString());
        });
    });
    
    // req.write(state);
    req.end();
}
