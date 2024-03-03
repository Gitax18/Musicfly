import express from "express";
import bodyParser from "body-parser";
import Seq from "sequelize";
import path from "path";
import 'dotenv/config';
import multer from "multer";

import {router} from "./routes.js";
import {sequelize} from "./database.js";

import {Admin} from './models/admin.js'

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


// avoinding CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
});


app.use(router);

sequelize.sync().then((res)=>{
    app.listen(PORT, ()=>{
        console.log(`listening on http://localhost:${PORT}`);

        //Uncomment this below code, and restart the server, and then comment again.


        /*
        const username = 'root';
        const password = 'root';
        Admin.create({
            username: username,
            password: password    
        }).then(data =>{
            console.log("data stored successfully");
        }).catch(err =>{
            console.log("Error while registering new User: ", err);
        })
        */
    })
}).catch(err =>{
    console.log("Error connecting database\n\n\n\n");
    console.log(err);
})