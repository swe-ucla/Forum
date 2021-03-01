var express = require('express');
var router = express.Router();
var pool = require('../db')



/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/hello', function(req, res) {
  res.json('hello world')
})

// get posts
router.get('/api/get/allposts', (req, res, next ) => {
  pool.query("SELECT * FROM posts ORDER BY date_created DESC", (q_err, q_res) => {
      res.json(q_res.rows)
  })
})

// save post
router.post('/api/posts/poststodb', (req, res, next) => {
  try {
    let forumId = 0
    const subForumName = [req.body.subforum]

    //use subforum name to identify subforum id. 
    pool.query("SELECT forum_id FROM subforums WHERE forum_name = $1", subForumName, (q_err, q_res) => {
      if(q_err) return next(q_err);
      
      forumId = q_res.rows[0].forum_id
      const values = [forumId, req.body.title, req.body.body, req.body.uid, req.body.username] 
      console.log(values)
      
      pool.query('INSERT INTO posts(forum_id, title, body, user_id, username, date_created, date_last_updated) VALUES($1, $2, $3, $4, $5, NOW(), NOW())', values, (q_err, q_res) => {
        if(q_err) return next(q_err)
        res.json(values)
      })
    })
  } catch(error) {
      console.log('ERROR:', error)
      res.status(500).send('service internal error')
  }

})

// update posts
router.put('/api/put/post', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
  pool.query('UPDATE posts SET title=$1, body=$2, user_id=$3, username=$5, date_created=NOW() WHERE pid = $4', values, (q_err, q_res) => {
    res.json(q_res.rows)
  })
})

// delete post comments
router.delete('/api/delete/postcomments', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query('DELETE FROM comments WHERE post_id = $1', [ post_id ], (q_err, q_res) => {
    res.json(q_res.rows)
    console.log(q_err)
  })
})

// delete post
router.delete('/api/delete/post', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query('DELETE FROM posts WHERE pid = $1', [ post_id ], (q_err, q_res) => {
    res.json(post_id)
  })
})

module.exports = router;
