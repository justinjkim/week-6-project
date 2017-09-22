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

// for now, only choose words that are 10 letters or less
let trimmed = [];
for (let i = 0; i < words.length; i++) {
  if (words[i].length <= 10) {
    trimmed.push(words[i]);
  }
}

let randomWord = trimmed[Math.floor(Math.random() * trimmed.length)]; // "words" is defined in line 6
console.log(randomWord);

const splitWord = [...randomWord];
console.log(splitWord);

let extraArray = [...randomWord];

let guessWord = extraArray.fill('_');
console.log(guessWord);

let guessedLetters = [];
let correctLetters = [];
let guessesLeft = 3;
let loss = '';

app.get('/', function(req, res) {
  res.render('index', {randomWord, guessesLeft, splitWord, guessWord, guessedLetters, correctLetters, loss});
  req.session.word = randomWord; // do I need this?
  console.log('The req.session.word is ' + req.session.word);
});

app.post('/', function(req, res) {
  let guess = req.body.guess.toLowerCase();
  validateWord(guess);
  console.log(guess);
  res.render('index', {randomWord, guessesLeft, splitWord, guessWord, guessedLetters, correctLetters, loss})
})



app.listen(3000, function(req, res) {
  console.log('Starting up Mystery Word app...');
})

function validateWord(guess) {
  if (splitWord.includes(guess)) {
    let correctGuess = splitWord.indexOf(guess);
    while (~correctGuess) {
      guessWord[correctGuess] = guess;
      correctGuess = splitWord.indexOf(guess, correctGuess + 1);
    }

    correctLetters.push(guess);
    guessedLetters.push(guess);
  }
  else {
    guessesLeft -= 1;
    guessedLetters.push(guess);
    if (guessesLeft === 0) {
      loss = 'Sorry! You lost! The word was: ' + randomWord;
    }
  }
} // end of validateWord()
