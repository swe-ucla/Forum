var express = require('express')
var router = express.Router()
var pool = require('../db')



router.get('/api/get/allposts', (req, res, next ) => {
    pool.query("SELECT * FROM posts ORDER BY date_created DESC", (q_err, q_res) => {
        res.json(q_res.rows)
    })
})

router.posts('/api/posts/poststodb', (req, res, next) => {
    const values = [req.body.title, req.body.body, req.body.uid, req.body.username]
    pool.query('INSERT INTO posts(title, body, user_id, username, date_created) VALUES($1, $2, $3, $4, NOW())', values, (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res.rows)
    })
})


router.put('/api/put/post', (req, res, next) => {
    const value = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
    pool.query('UPDATE posts SET title=$1, body=$2, user_id=$3, username=$5, date_created=NOW() WHERE pid = $4, values, (q_err, q_res) => {
        res.json(q_res.rows)
    })
})
