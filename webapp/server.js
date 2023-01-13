const http = require('http');
const formidable = require('formidable');
const mg= require("mongodb");
const fs= require("fs")

http.createServer((req,res)=>{



    if (req.url="/loginpage")
    {
        loginpage=fs.readFile("webapp/login.html", (err,data)=>{
            if(err) throw err;
            res.write(loginpage);
            return res.end();
        })
    }
}).listen(5500)
//http://localhost:5500/loginpage/