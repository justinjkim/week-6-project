const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
 secret: 'mystery word',
 resave: false,
 saveUninitalized: true
}));


// game variables
let randomWord = words[Math.floor(Math.random() * words.length)]; // "words" is defined in line 6
console.log(randomWord);
let splitWord = [...randomWord];
console.log(splitWord);
let guessWord = splitWord.fill('');
console.log(guessWord);
let guessedLetters = [];




app.get('/', function(req, res) {
  res.render('index', {splitWord, guessWord, guessedLetters});
})



app.listen(3000, function(req, res) {
  console.log('Starting up Mystery Word app...');
})
