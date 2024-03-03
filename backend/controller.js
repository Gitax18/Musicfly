import path from 'path';
import fs from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {User} from './models/user.js';
import {Song} from './models/song.js';
import {Admin} from './models/admin.js';


// Utilities Functions
function imageToBase64(imagePath) {
    try {
        // Read image file as binary data
        const imageData = fs.readFileSync(imagePath);
        // Convert binary data to Base64 string
        const base64Image = Buffer.from(imageData).toString('base64');
        // Create Base64 data URL
        const base64ImageUrl = `data:image/png;base64,${base64Image}`; // Adjust MIME type based on image type

        return base64ImageUrl;
    } catch (error) {
        console.error('Error reading image file:', error);
        return null;
    }
}
          
const loginUser = (req, res) => {
    if(req.body){
        const username = req.body.username;
        const password = req.body.password;

        User.findAll({where: { 
                username: username,
                password: password
            }
        }).then(data=>{
            if(data.length != 0) {
                res.send(data[0].dataValues);
            }
            else res.sendStatus(401);
        }).catch(err => {
            console.log("Error occured while checking login credentials: ", err);
            res.sendStatus(500);
        })
    }
}

const registerUser = (req, res) => {
    console.log(req.body);
    if (req.body){
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        User.create({
            username: username,
            email: email,
            password: password    
        }).then(data =>{
            console.log("data stored successfully");
            res.sendStatus(201);
        }).catch(err =>{
            console.log("Error while registering new User: ", err);
            res.sendStatus(400);
        })
    }
    else {
        console.log("error while retrieving body");
        res.sendStatus(500);
    }
}

const sendAdmin = (req, res) =>{
    res.sendFile(path.join(__dirname, './', 'public', 'login-form.html'))
}

const loginAdmin = (req, res)=>{
    console.log(req.body);
    
    if(req.body){
        const username = req.body.username;
        const password = req.body.password;
    
        Admin.findAll({where: { 
                username: username,
                password: password
            }
        }).then(data=>{
            if(data.length != 0) {
                res.sendFile(path.join(__dirname, './', 'public', 'dashboard.html'));
            }
            else res.sendStatus(401);
        }).catch(err => {
            console.log("Error occured while checking login credentials: ", err);
            res.sendStatus(500);
        })
    }
}

const allUser= (req,res) =>{
    try{
        User.findAll().then(users=>{
            res.json(users);
        }).catch(err =>{
            res.sendStatus(500);
        })
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

const delUser= (req,res) =>{
    const id = req.params.id;
    User.findByPk(id)
    .then(row =>{
        if (!row) {
            res.sendStatus(404);
        }
        // Delete the row
        return row.destroy();
    })
    .then(numDeletedRows => {
        // numDeletedRows will contain the number of rows deleted
        if (numDeletedRows !== undefined) {
            console.log(`${numDeletedRows} row(s) deleted`);
            res.send('Deleted')
        }
    })
    .catch(err => {
        // Handle errors
        console.error('Error deleting row:', err);
    })
};


const delSong= (req,res) =>{
    const id = req.params.id;
    Song.findByPk(id)
    .then(row =>{
        if (!row) {
            res.sendStatus(404);
        }
        // Delete the row
        return row.destroy();
    })
    .then(numDeletedRows => {
        // numDeletedRows will contain the number of rows deleted
        if (numDeletedRows !== undefined) {
            console.log(`${numDeletedRows} row(s) deleted`);
            res.send('Deleted')
        }
    })
    .catch(err => {
        // Handle errors
        console.error('Error deleting row:', err);
    })
}

const addSong = (req, res) => {
    console.log("api hit");
    if (req.body){
        const songName = req.body['song-name'];
        const albumId = req.body.albumId;
        const filePath = req.files.songFile[0].path;
        const audioMime = req.files.songFile[0].mimetype;
        const imgMime = req.files.songCover[0].mimetype;
        const coverPath = req.files.songCover[0].path;
        const genre = req.body.genre;
        const releaseyear= req.body.releaseYear;

        Song.create({
            songname: songName,
            albumId: albumId,
            filePath: filePath,
            coverPath: coverPath,
            genre: genre,
            releaseYear: releaseyear,
            audioMime: audioMime,
            imgMime: imgMime
        }).then(data =>{
            console.log("song stored successfully");
            res.sendStatus(200);
        }).catch(err =>{
            console.log("Error while registering new Song: ", err);
            res.sendStatus(400);
        });
    }
}

const allSongs = (req, res) => {
    try{
        Song.findAll().then(songs=>{
            
            for(let song of songs){
                const imgPath = song.dataValues.coverPath;
                const imgbase64 = imageToBase64(imgPath);
                song.dataValues.img = imgbase64;
            }
            res.json(songs);
        }).catch(err =>{
            res.sendStatus(500);
        })
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

const playSong = (req, res) => {
    const id = req.params.songId;
    try{
        Song.findByPk(id).then(song =>{
            const file = path.join(__dirname,song.dataValues.filePath);
            console.log(file)
            res.sendFile(file); 
        }).catch(er=> res.send(er));
    }catch(err){
        res.sendStatus(500);
    }
}

export {loginUser, registerUser, allSongs, playSong, addSong, loginAdmin, sendAdmin, allUser, delSong, delUser};

