var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

/* GET ALL TodoS */
router.get('/', function (req, res, next) {
  console.log(req)

  Todo.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});


/* GET SINGLE Todo BY ID */
router.get('/:id', function (req, res, next) {
  console.log(req)

  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Todo */
router.post('/', function (req, res, next) {
  console.log(req)
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Todo */
router.put('/:id', function (req, res, next) {
  console.log(req.body, req.params.id,)

  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Todo */
router.delete('/:id', function (req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
