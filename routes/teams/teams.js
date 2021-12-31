const { Router } = require('express');
const members=require('./members/members');
const createController = require('../../controllers/teams/createController');
const deleteController = require('../../controllers/teams/deleteController');

const router = Router()

router.use('/members', members);

router.post('/create', createController);
router.delete('/', deleteController);

module.exports = router