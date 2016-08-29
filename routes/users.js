var express = require('express');
var user = require('./../data-stores/user');
var router = express.Router();

router.post('/login', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var login;
    try {
        login = user.email === req.body.user.email && user.password === req.body.user.password;
    } catch(e) {
        login = false;
    }
    res.send(JSON.stringify({
        status: 'ok',
        login: login,
        user: login ? user : null
    }));
});

module.exports = router;
