const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let trimmed = [];

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
for (let i = 0; i < words.length; i++) {
  if (words[i].length < 10) {
    trimmed.push(words[i]);
  }
}
let randomWord = trimmed[Math.floor(Math.random() * trimmed.length)]; // "words" is defined in line 6
console.log(randomWord);

let splitWord = {};
splitWord.word = [...randomWord];
console.log(splitWord);

// let guessWord = splitWord.fill('');
// console.log(guessWord);

let guessedLetters = [];




app.get('/', function(req, res) {
  res.render('index', {randomWord, splitWord, guessedLetters});
});

app.post('/', function(req, res) {
  let guess = req.body.guess;
  validateWord(guess);
  console.log(guess);
  res.render('index', {splitWord, guessWord, guessedLetters})
})



app.listen(3000, function(req, res) {
  console.log('Starting up Mystery Word app...');
})

function validateWord(guess) {
  if (splitWord.includes(guess)) {
    let correctGuess = splitWord.indexOf(guess);
  }
  else {
    guessedLetters.push(guess);
  }
}
