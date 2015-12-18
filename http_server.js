var http = require("http");
var qs = require('querystring');
var fs = require('fs');


var host = "127.0.0.1";
var port = 8000;


try {
    var server = http.createServer(function serverCreatedHandler(req, res){

        if( req.method !== 'GET' ) {
            res.end("Request is other than 'GET'.");
            console.log("Request is other than 'GET'.");
        } else {
            if( req.url.split('/')[1] == "favicon.ico" ) {
                //console.log("URL: "req.url);
                res.end();
            } else {
                //from browser:-->  http://127.0.0.1:8000/hello.html?image=India-Pak.jpg
                var imageName = qs.parse( req.url.split('?')[1] ).image;//.toLowerCase();//Converte folder name to lower case.
                if(imageName == "" || imageName == undefined) {
                    res.end("Image name not provided.");
                    console.log("Image name not provided.");
                } else {
                    fs.exists("./images/" + imageName, function isImageFound(exists){
                        if(!exists) {
                            res.writeHead(400, {'content-type': 'text/html'});
                            res.end("<h1>Image not found: " + imageName + "</h1>");
                            console.log("Image not found with the given name.");
                        } else {
                            //Read synchronously the images from Image folder.
                            var img = fs.readFileSync( "./images/" + imageName );
                            res.writeHead(200, {'Content-Type': 'image/gif'});
                            res.end(img, 'binary');
                            console.log("File send successfully.");
                        }
                    });
                }
            }
        }
    });
    server.listen(port, host, function serverListenHandler(){
        console.log("Server is listening on " + host + ":" + port);
    });
} catch (errorResponce) {
    console.log("Main Execution aborted: ", errorResponce);
}



//querystring.parse('foo=bar&baz=qux&baz=quux&corge')
// returns
//{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }

//querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })
// returns
//'foo=bar&baz=qux&baz=quux&corge='