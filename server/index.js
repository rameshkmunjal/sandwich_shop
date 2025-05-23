/* dependencies */
import express from 'express';
const app=express();
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import routeIndex from './routes/index.js';


const server=http.createServer(app);

/* middleware */
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', routeIndex);

/* check - server is listening or not */
server.listen(5000);
server.on('listening', onListening);
server.on('error', onError);

function onListening(){
    console.log("Server is Listening");
    let db=mongoose.connect('mongodb://127.0.0.1/shopDB', {useNewUrlParser:true} )
}

function onError(){
    console.log("error happened in server connection");
}

/* check - mongodb connection setup or not */
mongoose.connection.on('open', function(err){
    if(err){
        console.log("An error occurred in mongoose connection open");
    } else {
        console.log("mongoose connection set up successfully");
    }
})

mongoose.connection.on('error', function(err){
    console.log("some error happened in mongoose connection", err);
})