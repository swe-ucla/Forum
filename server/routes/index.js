var express = require('express');
var router = express.Router();
var pool = require('../db')



/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

// get posts
router.get('/api/get/allposts', (req, res, next ) => {
  pool.query("SELECT * FROM posts ORDER BY date_created DESC", (q_err, q_res) => {
      res.json(q_res.rows)
  })
})

// save post
router.post('/api/posts/poststodb', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.username]
  pool.query('INSERT INTO posts(title, body, user_id, username, date_created) VALUES($1, $2, $3, $4, NOW())', values, (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(
        {
          title: values[0],
          body: values[1],
          uid: values[2],
          username: values[3]
        }
      )
  })
})

// update posts
router.put('/api/put/post', (req, res, next) => {
  const value = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
  pool.query('UPDATE posts SET title=$1, body=$2, user_id=$3, username=$5, date_created=NOW() WHERE pid = $4', values, (q_err, q_res) => {
    res.json(
      {
        title: values[0],
        body: values[1],
        uid: values[2],
        pid: values[3],
        username: values[4]
      }
    )
  })
})

// delete post comments
router.delete('/api/delete/postcomments', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query('DELETE FROM comments WHERE post_id = $1', [ post_id ], (q_err, q_res) => {
    res.json(
      {
        deleted: post_id
      }
    )
  })
})

// delete post
router.delete('/api/delete/post', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query('DELETE FROM posts WHERE pid = $1', [ post_id ], (q_err, q_res) => {
    res.json(
      {
        deleted: post_id
      }
    )
  })
})

module.exports = router;
