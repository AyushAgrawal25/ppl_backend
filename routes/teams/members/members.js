const { Router } = require('express');
const deleteController = require('../../../controllers/teams/members/deleteController');
const addController = require('../../../controllers/teams/members/addController');

const router = Router()

router.post('/add', addController);
router.delete('/', deleteController);

module.exports = router