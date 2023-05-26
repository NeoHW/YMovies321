// Experimentation of the IMDB API. 
// Referenced from https://imdb-api.com

export default async function get() {
    var res;
    var https = require('follow-redirects').https;

    var options = {
        'method': 'GET',
        'hostname': 'imdb-api.com',
        'port': 443,
        'path': '/en/API/Title/k_ll5bu34z/tt1832382',
        'headers': {
        },
        'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            res = body.toString();
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();
    return res;
}