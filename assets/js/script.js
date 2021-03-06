var aside = document.querySelector("aside")
var body = document.querySelector("body")
var cardsArray = document.querySelectorAll(".card-front");
var cards = document.querySelector(".card")
var gameCards = document.getElementById("gameCards")
var modal = document.getElementsByClassName("modal")
var gamesPlayedNumber = document.getElementById("gamesPlayedNumber");
var matchAttempts = document.getElementById("matchAttempts");
var matchAccuracy = document.getElementById("matchAccuracy");
var resetButton = document.getElementById("resetButton");
var startButton = document.getElementById("startButton");
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var cardFrontClass = "card-front";
var attempts = 0;
var matches = 0;
var maxMatches = 9;
var gamesPlayed = 0;


var pokemonCards = [
  "bulbasaur",
  "bulbasaur",
  "butterfree",
  "butterfree",
  "charmander",
  "charmander",
  "dugtrio",
  "dugtrio",
  "lapras",
  "lapras",
  "mew",
  "mew",
  "pikachu",
  "pikachu",
  "snorlax",
  "snorlax",
  "squirtle",
  "squirtle"
]


gameCards.addEventListener("click", handleClick);

startButton.addEventListener("click", startgame);

resetButton.addEventListener("click", resetGame);

function cardInitializer() {
  shuffleCards();
  for (var cardIndex = 0; cardIndex < pokemonCards.length; cardIndex++) {
    var cardContainer = document.createElement("div")
    cardContainer.classList.add("col-2", "card")
    var cardBack = document.createElement("div")
    cardBack.classList.add("card-back")
    var innerCardDiv = document.createElement("div");
    innerCardDiv.classList.add(cardFrontClass, pokemonCards[cardIndex]);
    cardContainer.appendChild(innerCardDiv);
    cardContainer.appendChild(cardBack);
    gameCards.appendChild(cardContainer);
  }
}

function shuffleCards() {

  pokemonCards = pokemonCards.slice();
  for (var i = 0; i < pokemonCards.length; i++) {
    var randomPosition = Math.floor(Math.random() * pokemonCards.length)
    var placeHolder = pokemonCards[i];
    pokemonCards[i] = pokemonCards[randomPosition];
    pokemonCards[randomPosition] = placeHolder;
  }
  return pokemonCards;
}


function displayStats() {
  matchAccuracy.textContent = calculateAccuracy(attempts, matches);
  gamesPlayedNumber.textContent = gamesPlayed;
  matchAttempts.textContent = attempts;
}

function calculateAccuracy(attempts, matches){
  if (!attempts) {
    return attempts = "0%";
  } else {
    return ((Math.trunc((matches / attempts) * 100)) + "%");
  }
}


function handleClick(event){
  if(event.target.className.indexOf("card-back") === -1){
    return;
  }
  event.target.classList.add("hidden")

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className


  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener("click", handleClick);
    if(firstCardClasses === secondCardClasses){
      gameCards.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      attempts++
      matches++
      displayStats();
      if (maxMatches === matches){
        modal[2].classList.remove("hidden")
        modal[3].classList.remove("hidden")
      }
    } else {
      setTimeout(function(){
        firstCardClicked.classList.remove("hidden", "rotateBackCard")
        secondCardClicked.classList.remove("hidden", "rotateBackCard")
        gameCards.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        attempts++
        displayStats();
      }, 500);
    }
  }
}

function startgame(){
  aside.classList.remove("hidden")
  modal[0].classList.add("hidden");
  modal[1].classList.add("hidden");
  cardInitializer();
}

function resetCards(){
  while (gameCards.firstChild) {
    gameCards.removeChild(gameCards.firstChild)
  }
}

function resetGame() {
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  modal[2].classList.add("hidden");
  modal[3].classList.add("hidden");
  resetCards();
  cardInitializer()
}
