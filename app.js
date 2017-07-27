/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore, activePlayer, gamePlaying, prevRoll, numSet, lastDice;
init();

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDom = document.querySelector('.dice');
    var diceDom2 = document.querySelector('.dice2');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    diceDom2.style.display = 'block';
    diceDom2.src = 'dice-' + dice2 + '.png';

    //3. Update the round score IF the rolled number was not a 1
    if (dice === 6 && lastDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    }else if (dice !== 1 && dice2 !== 1) {
      roundScore += (dice + dice2);
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
      //Next pLayer
      nextPlayer();
    }
    //prev roll
    lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    //1. add CURRENT to GLOBAL score;
    scores[activePlayer] += roundScore;
    //2. update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    numSet = document.querySelector('.input-number').value;
    var winningScore;
    if (numSet) {
      winningScore = numSet;
    }else {
      winningScore = 100;
    }
    //3. check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.input-number').addEventListener('keyup', () => {
  //get value from input set numset to that value
  numSet = document.querySelector('.input-number').value;

});



function nextPlayer() {
  //Next pLayer
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}


function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  // lastDice = 0;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
