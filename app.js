/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer;
scores = [0,0];
roundScore = 0;
activePlayer = 0;

//console.log(dice);

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', () => {
  //1. Random Number
  var dice = Math.floor(Math.random() * 6) + 1;

  //2. Display the result
  var diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'dice-' + dice + '.png';

  //3. Update the round score IF the rolled number was not a 1
  if (dice !== 1) {
    //Add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }else{
    //Next pLayer
    nextPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  //1. add CURRENT to GLOBAL score;
  scores[activePlayer] += roundScore;
  //2. update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  //3. check if player won the game
  if (scores[activePlayer] >= 20) {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER'
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
  }else {
    nextPlayer();
  }
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
}
