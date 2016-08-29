var express = require('express');
var router = express.Router();
var events = require('./../data-stores/events');


router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({status: 'ok', events: events}));
});


router.post('/save', function(req, res) {
    try{
        var event = req.body.event;
        if(!event.id) {
            event.id = Math.random() * 10000;
            events.unshift(event);
        } else {
            var items = events.filter(function(item) {
                return item.id==event.id;
            });
            events[events.indexOf(items[0])] = event;

        }
    } catch(e) {
        console.log('e: ', e);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({status: 'ok', event: event}));
});


router.post('/delete', function(req, res) {
    try{
        events.splice(req.body.id, 1);
    } catch(e) {
        console.log('e: ', e);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({status: 'ok'}));
});


router.post('/user-registration', function(req, res) {
    try{
        var items = events.filter(function(item) {
            return item.id==req.body.eventId;
        });
        items[0].registrations.push(req.body.user);
        items[0].remainingSeats--;
    } catch(e) {
        console.log('e: ', e);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'ok'});
});


router.post('/delete-registration', function(req, res) {
    try{
        var items = events.filter(function(item) {
            return item.id==req.body.eventId;
        });
        items[0].registrations.splice(req.body.id, 1);
        items[0].remainingSeats++;
    } catch(e) {
        console.log('e: ', e);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({status: 'ok'}));
});


module.exports = router;
