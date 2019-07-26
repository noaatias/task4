var express = require('express');
var router = express.Router();
const { Member } = require('../models/Member');

router.get('/', async function (req, res, next) {
    const members = await Member.find().select().exec();
    res.send(members);
});

module.exports = router;