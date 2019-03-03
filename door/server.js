var http = require('http');
var url = require('url');
var qs = require('querystring');

http.createServer(function(req, res) {
    console.log(req.url);
    if(req.method === 'GET') {
        var pathname = url.parse(req.url).pathname;
        if(pathname === '/image/take') {
            var query = url.parse(req.url).query;
            var obj = qs.parse(query);
            console.log(obj);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('OK');
        }
    }
}).listen(8888);