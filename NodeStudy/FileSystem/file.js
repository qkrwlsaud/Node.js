var http = require('http');
var fs = require('fs'); //fs module
var url = require('url');

var app = http.createServer(function(req,res){
    var _url = req.url;  //요청 받은 url
    var queryData = url.parse(_url,true).query; //파라미터
    var pathname = url.parse(_url).pathname; // 파일 경로 위치

    if(pathname == '/'){ 
        if(queryData.id == undefined){
            fs.readdir('./file',function(error,filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';

                var list = '<ul>';
                var i = 0;
                
                while(i<filelist.length){
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;;
                }
                list += '</ul>';

                var template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                    </html>
                `;
                
                res.writeHead(200);
                res.end(template);
            });
        }
        else{
            fs.readdir('./file',function(err,filelist){
                // var title = 'Welcome';
                // var description = 'Hello, Node.js';
                var list = '<ul>';
                var i = 0;
    
                while(i < filelist.length){
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                }
    
                list += '</ul>';
    
                fs.readFile(`./file/${queryData.id}`,'utf8', function(err,description){
                    var title = queryData.id;
                    var template = `
                        <!doctype html>
                        <html>
                        <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                        </head>
                        <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${title}</h2>
                        <h3>${description}</h3>
                        </body>
                        </html>               
                    `;
                    res.writeHead(200);
                    res.end(template);
                });  
    
            });
        
        }
    } else {
        res.writeHead(404);
        res.end('Not found');
      }

});
app.listen(3000);    

