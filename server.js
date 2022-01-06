
 
var http = require('http'), 
fs = require('fs');
'use strict';
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
    console.log('Escutando em  http://localhost:3000/');
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


function convert_imagem(base64str){
    
   var image = new Image();
   image.onload = function(){
   console.log(image.width); // image is loaded and we have image width 
}
image.src = 'data:image/jpg;base64,'+base64str;
document.body.appendChild(image);
    
}



