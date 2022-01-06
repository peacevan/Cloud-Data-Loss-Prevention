
 
/*
const http = require('http')
const port = 3000
const ip = 'localhost'

const server = http.createServer((req, res) => {
  //const responses = []
  //responses['/'] = '<h1>Home</h1>'
  //responses['/inscreva-se'] = '<h1>Inscreva-se</h1>'
  //responses['/local'] = '<h1>Local</h1>'
  //responses['/contato'] = '<h1>Contato</h1>'
  //responses['/naoExiste'] = '<h1>URL sem resposta definida!</h1>'
  //res.end(responses[req.url] || responses['/naoExiste']);
 // res.redirect(req.url);
  fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
   
})

server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})*/
var http = require('http'), 
fs = require('fs');


		
'use strict';
// node v8.11.3
/*const Buffer = require('buffer').Buffer;
const path = require('path');



fs.readFile('./index.html', function (err,html) {
    if (err) {
        throw err; 
    }       
http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(3000,() => console.log("Servidor rodando local na porta 3000"));
});
*/


var path = require('path');
var http = require('http');
var fs = require('fs');

var dir = path.join(__dirname, '/public');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

var server = http.createServer(function (req, res) {
    var reqpath = req.url.toString().split('?')[0];
    if (req.method !== 'GET') {
        res.statusCode = 501;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Method not implemented');
    }
    var file = path.join(dir, reqpath.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.setHeader('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    });
});

server.listen(3000, function () {
    console.log('Listening on http://localhost:3000/');
});




/**
 * @param  {string} filename
 */
function encode_base64(filename) {
  fs.readFile(path.join(__dirname, '/public/', filename), function(error, data) {
    if (error) {
      throw error;
    } else {
      let buf = Buffer.from(data);
      let base64 = buf.toString('base64');
      // console.log('Base64 ' + filename + ': ' + base64);
      return base64;
    }
  });
}
/**
 * @param  {string} base64str
 * @param  {string} filename
 */
function decode_base64(base64str, filename) {
  let buf = Buffer.from(base64str, 'base64');

  fs.writeFile(path.join(__dirname, '/imagens_processada/', filename), buf, function(error) {
    if (error) {
      throw error;
    } else {
      console.log('File created from base64 string!');
      return true;
    }
  });
}






