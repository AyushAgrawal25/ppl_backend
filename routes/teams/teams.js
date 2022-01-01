const { Router } = require('express');
const path = require("path");
const multer = require('multer');

const members=require('./members/members');
const createController = require('../../controllers/teams/createController');
const deleteController = require('../../controllers/teams/deleteController');
const getController = require('../../controllers/teams/getController');

const router = Router()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("./public/uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
    storage:fileStorageEngine
});

router.use('/members', members);

router.get('/', getController);
router.post('/create', upload.single('image'), createController);
router.delete('/', deleteController);

module.exports = router