const express = require('express');
const app = express();
//const {Router} = require('express');
const fetch =  require('node-fetch');
const path = require('path');
const request = require('request');

var url = "https://jsonplaceholder.typicode.com/todos/"
// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/users', async (req, res)=>{
    const r = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await r.json();
    res.send(data);
    /*request({
        url: url,
        json: false
    }, (err, response, body)=>{
        if(!err && response.statusCode === 200){
            res.send(body)
        }
    });*/
    
});
app.get('/users/:id', (req, res)=>{
    var itemId = req.params.id;
    request({
        url: url+itemId,
        json: false
    }, (err, response, body)=>{
        if(!err && response.statusCode === 200){
            res.send(body)
        }
    });
});

// routes
//app.use('/users', require('./public/users'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
