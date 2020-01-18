const express = require('express');
const bodyParser = require('body-parser');

const Promo = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

promotionRouter.route('/')
.get((req,res,next) => {
    Promo.find(req.query)
    .then((p) => {
        res.json(p);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promo.create(req.body)
    .then((p) => {
        res.json(p);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promo.remove({})
    .then((p) => {
        res.json(p);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promotionRouter.route('/:promoId')
.get((req,res,next) => {
    Promo.findById(req.params.promoId)
    .then((p) => {
        res.json(p);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promo.findByIdAndUpdate(req.params.promoId, {$set : req.body})
    .then((p) => {
        res.json(p);
    });
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promo.findByIdAndRemove(req.params.promoId)
    .then((p) => {
        res.json(p);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promotionRouter;