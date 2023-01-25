const gameContainer = document.getElementById("game");


// hide all contents of the body until the start game button is clicked
// Extra study: Add a button that when clicked will start the game
button.addEventListener("click", startGame);
function startGame() {
  let game = document.getElementById("game"); 
  game.classList.remove("hide");
  button.remove();
  return;
}


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let card1 = null;                     //starting point: the following values should begin 'falsy' or at 0
let card2 = null;
let match = null;
let cardsFlipped = 0;
let canClick = false;

function handleCardClick(event) {
  if (canClick) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target; 
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {                                         //if either value is the opposite of null (true)
    currentCard.classList.add("flipped");                         //add class list of "flipped"----------------------
    card1 = card1 || currentCard;                                 //card1 is the first card chosen or the current card
    card2 = currentCard === card1 ? null : currentCard;           //card2 is the current card but not equal to card1
    // console.log("first");
    }
  if (card1 && card2) {                                           //if both values are true let card1 be first pick and card2 second pick
    canClick = true;                                              

    let pick1 = card1.className;
    let pick2 = card2.className;
    // console.log("second");

    if (pick1 === pick2){                                     //if both picks are equal to each other, both stay flipped (+=2)-
      canClick = false;                                       //remove event listener & reset card values for next picks
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      // console.log("third");
    } else {                                      //otherwise reset the cards face down with 1 second timeout-------
      setTimeout(function() {                     //remove class list from flipped & reset card values for next picks
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        canClick = false;
      }, 1000);
    }
  }
  let win = false;                                //"win" the game when number of cardsFlipped is equal to the number of colors in [COLORS] array
  if (cardsFlipped === COLORS.length){            // & alert player they won the game------------------------------ 
    win = true;
    setTimeout(function(){
      alert("Congrats you win!")}, 500);
      // Add a button that when clicked will restart the game once it has ended
    function newGame() {
      let replay = document.createElement("button");
       document.body.append(replay);
       document.querySelector("button").innerText = "REPLAY GAME!";
       replay.onclick = function(){
        location.reload();
       }
    }
    if (win) {
      newGame();
    }
    
    

    // let replay = document.createElement("button").innerText("REPLAY GAME");
    // replay.addEventListener("click", location.reload());
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);





// Clicking a card should change the background color to be the color of the class it has. 
// Users should only be able to change at most two cards at a time. 
// Clicking on two matching cards should be a “match” — those cards should stay face up.
// When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.

// change background color on click
// cards clicked < 2
// if card1 === card 2 stay face up
// if card1 =/= card2 turn back over after after 1 second (timeout 1000ms)



// EXTRA STUDY----------------------------------


// For every guess made, increment a score variable and display the score while the game is played
// Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
// Allow for any number of cards to appear
// Instead of hard-coding colors, try something different like random colors or even images!
