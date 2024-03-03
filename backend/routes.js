import express from "express"
import multer from "multer"
import {loginUser, registerUser, allSongs, playSong, addSong, loginAdmin, sendAdmin, allUser, delSong, delUser} from "./controller.js"


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const filename = file.originalname.split(' ');
        const ext = file.originalname.split('.');
        console.log(filename[0], ext[ext.length-1]);
        return cb(null, `${Date.now()}-${filename[0]}.${ext[ext.length-1]}`);
        // return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage});
 

const router = express.Router();

// User ROUTES
router.post('/user/login', loginUser);
router.post('/user/register', registerUser);

// Songs ROUTES 
router.get('/songs/allSongs', allSongs);
router.get('/songs/:songId', playSong);

// admin routes
router.get('/admin', sendAdmin);
router.post('/admin', loginAdmin);
router.post('/admin/allUsers', allUser);
router.delete('/admin/deleteSong/:id', delSong);
router.delete('/admin/deleteUser/:id', delUser);
router.post('/admin/addSong', upload.fields([{name: 'songFile'}, {name: 'songCover'}] ), addSong);

export { router };