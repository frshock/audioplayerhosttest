const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8888;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next()
});

app.use(express.static(__dirname + './../build'))

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname + './../build/index.html'));
})

app.get('*', (req, res)=>{
    res.sendFile(path.resolve((__dirname + './../build/index.html')))
});

app.listen(PORT, ()=>{
    console.log('App listening on '+PORT)
})