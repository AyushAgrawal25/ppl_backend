const express=require('express');
const path =require('path');
const { Router } = require('express');
const getController = require('../../../controllers/logos/getController');

const router = Router()

router.get('/:fileName', getController);

module.exports = router