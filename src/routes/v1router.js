'use-strict';

const express = require('express');

const appendModel = require('../middleware/model-finder');

const router = express.Router();

router.param('model', appendModel);

router.get('/:model', getAllHandler);
router.post('/:model', postHandler);
router.get('/:model/:id', getHandler);
router.put('/:model/:id', putHandler);
router.delete('/:model/:id', deleteHandler);

function sendResult(result, res, status = 200, id) {
  if (!result && id) {
    return respondWith404(id, res);
  } else if (!result) {
    return res.status(500).json({error: 'Internal server error: Result was null without passing ID.'});
  }
  res.status(status).json(result);
}

function respondWith404(id, res) {
  res.status(404).json({error: `No item exists with id ${id}`});
}

function getAllHandler(req, res, next) {
  req.model.get()
    .then(result => sendResult({count: result.length, results: result}, res, 200))
    .catch(next);
}

function postHandler(req, res, next) {
  req.model.post(req.body)
    .then(result => sendResult(result, res, 201))
    .catch(next);
}

function getHandler(req, res, next) {
  req.model.get(req.params.id)
    .then(result => sendResult(result, res, 200, req.params.id))
    .catch(next);
}

function putHandler(req, res, next) {
  req.model.put(req.params.id, req.body)
    .then(result => sendResult(result, res, 200, req.params.id))
    .catch(next);
}

function deleteHandler(req, res, next) {
  req.model.delete(req.params.id)
    .then(result => sendResult(result, res, 200, req.params.id))
    .catch(next);
}

module.exports = exports = router;
