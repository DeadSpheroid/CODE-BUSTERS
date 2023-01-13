const http = require('http');
const formidable = require('formidable');
const mg= require("mongodb");
const fs= require("fs")

http.createServer((req,res)=>{

    if (req.url="/loginpage")
    {
        loginpage=fs.readFile("login.html", (err,data)=>{
            if(err) throw err;
            res.write(data);
            return res.end();
        })
    }
}).listen(8080)