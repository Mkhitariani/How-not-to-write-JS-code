const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const {Pool, Client} = require('pg');

const pool = new Pool({
  user: 'firstrole',
  host: 'localhost',
  database: 'firstdb',
  password: '11',
  port: 5432,
});

var app = express();

//app.set('views',__dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req, res) =>{
  res.render('index');
  // pool.query(`SELECT * FROM recipes WHERE id = ${id}`, (err, res) => {
  //   console.log(res.rows[0].price);
  //   pool.end();
  // })
});


app.post('/', (req, res) => {
  var id = req.body.id;
  var price;
  console.log(req.body.id);
  pool.query(`SELECT * FROM recipes WHERE id = ${id}`, (err, res) => {
    console.log(res.rows[0].price);
    price = res.rows[0].price;
    pool.end();
  });
  res.params = price;
   res.render('app', {data: price});
})

app.listen(3000);
console.log('server is running on port 3000');
