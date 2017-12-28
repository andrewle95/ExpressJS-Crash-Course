const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host    :  'localhost',
    user    :   'root',
    password:   'junepork1',
    database:   'nodemysql'
});


//conect
db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('MySQL Connected...');
});

//Create DB
app.get('/createddb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, resul) => {
        if (err) throw err;
        console.log(result);
        res.send('database created...');
    });
})

//Create Table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...');
    })

})

//Insert Post 1
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 1 added...')
    })
});

//Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('posts fetched....')
    })
});

//Select siingle post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post fetched....')
    })
});

//update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post update....')
    })
});

//delet post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post deleted....')
    })
});

app.get('/', function(req, res){
    res.send('Please use /api/books or /api/genres');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
