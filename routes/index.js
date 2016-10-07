var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('partials/login');
});
// INPUT: { "user": "test" }
// OUTPUT: {  }
router.get('/api/login/salt', function(req, res, next) {
  const saltQuery = "SELECT salt FROM users WHERE username='" + req.body.user + "'";
  const results = [];
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500), json({success: false, data: err});
    }
    const query = client.query(saltQuery);
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
