let alreadyGuessed = document.getElementById("alreadyGuessed");
let submit = document.getElementById("submit");
let letterTracker = document.getElementById("letterTracker");

console.log(alreadyGuessed);
console.log(submit);
console.log(letterTracker);

submit.addEventListener("submit", function() {
  letterTracker.removeChild(alreadyGuessed);
});
