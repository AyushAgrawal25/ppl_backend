const { Router } = require('express')
const router = Router()

const teams=require('./teams/teams');

router.use('/teams', teams);

module.exports = router