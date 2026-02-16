const http = require('http');

const url = 'http://localhost:5000/uploads/24hr.png';

http.get(url, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);
    console.log(`ContentType: ${res.headers['content-type']}`);
    console.log(`ContentLength: ${res.headers['content-length']}`);
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
