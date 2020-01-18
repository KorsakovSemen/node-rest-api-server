const express = require('express');
const bodyParser = require('body-parser');
const mongooes = require('mongoose');

var Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

var authenticate = require('../authenticate');

leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find(req.query).then((leaders) => {res.json(leaders)});
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.create(req.body).then((dish) => {res.json(dish)});
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   console.log('nothing');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.remove({}).then((resp) => {res.json(resp)});
});

leaderRouter.route('/:lId')
.get((req,res,next) => {
    Leaders.findById(req.params.lId)
    .then((lead) => {
        res.json(lead);
    })  ;   
    
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    req.end('Nothing');
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.lId, {
        $set: req.body
    }, { new: true })
    .then((lead) => {
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.lId)
    .then((lead) => {
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = leaderRouter;