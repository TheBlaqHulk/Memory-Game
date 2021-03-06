const cards = document.querySelectorAll('.cards');

let hasFlippedCard = false;
let lockBoard = false;//To stop the user from picking more than 2 cards
let firstCard, secCard;
let count = 20;//To allow when the alert() may be called --> Telling the users they have finished

//This is where the game starts
function flipCard() {
  if (lockBoard) return;
  if(this === firstCard) return;//prevents the user from double clicking on the same card
  this.classList.toggle('flip');

  //Stops the user from flipping the same card twice
  if(!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  hasFlippedCard = false;
  secCard = this;

  checkMatch();

  //Telling the user that they have completed the game
  if (count === 0)
  {
    alert("YOU DID IT! NICE GAME!");
  }
}

function removeFlip() {
  firstCard.classList.remove('flip');
  secCard.classList.remove('flip');

  resetBoard();
}

//To return the cards back around after there is no match
function unFlipCards() {
  lockBoard = true;
  setTimeout(removeFlip, 1500);
}

//To see if the cards match
function checkMatch() {
  // do cards match?
    if (firstCard.dataset.framework === secCard.dataset.framework) {
      //it's a match!!
      disableCards();
      count-= 2;
    } else {
      //not a match
      unFlipCards();
  }
}

//Prevent any interaction after the cards match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secCard.removeEventListener('click', flipCard);

  resetBoard();
}

//To make sure that not more than 2 cards are chosen
function resetBoard () {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secCard] = [null, null];
}

//To randomise the positions of the cards on the board  --> Learnt this syntax on ES6(Call right after creating function)
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 20);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
