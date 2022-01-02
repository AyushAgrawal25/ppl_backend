const { Router } = require('express');
const deleteController = require('../../../controllers/members/deleteController');
const addController = require('../../../controllers/members/addController');

const router = Router()

router.post('/add', addController);
router.delete('/', deleteController);

module.exports = router