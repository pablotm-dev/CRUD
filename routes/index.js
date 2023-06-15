var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/listar', function(req, res, next) {
  res.render('listar', { title: 'Express' });
});

module.exports = router;
