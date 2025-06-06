const express = require('express')
const app = express()
const path = require("path");
const fs =  require("fs");


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/', function(req,res){
    fs.readdir(`./files`, function(err,files){
        res.render("index",{files:files});
    });
})

app.get('/files/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("show",{filename:req.params.filename, filedata:filedata });
    })
})

app.post('/create', function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('') }.txt`,req.body.details,function(err){
        if (err) {
            return res.status(500).send("Failed to write file");
        }
        res.redirect("/");//this post will go to /create when creating and tghen back to the root 
    });
})

app.listen(3000);