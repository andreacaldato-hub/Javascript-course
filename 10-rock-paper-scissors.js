choices = ['rock', 'paper', 'scissors']
wins = 0;
losses = 0
ties = 0
function randChoice() {
  const compChoice = choices[Math.floor(Math.random() * choices.length)];
  return compChoice

}

function playGame(choice) {
  compChoice = randChoice();
  let scores = document.querySelector('.js-scores')
  if (choice === compChoice) {
    result = 'draw';
    ties++;
    updateScores()
  }
  else if ((choice === 'rock' && compChoice === 'scissors') || (choice === 'paper' && compChoice === 'rock') || (choice === 'scissors' && compChoice === 'paper')) {
    result = 'win'
    wins++
    updateScores()
  }
  else {
    result = 'loss'
    losses++
    updateScores()
  }
  return result

}
let resultElem = document.querySelector('.js-result-text')
function printResult(result) {
  console.log(resultElem)
  if (result === 'draw') {
    resultElem.textContent = 'Tie.'
  }
  else if (result === 'win') {
    resultElem.textContent = 'You Win.'
  }
  else {
    resultElem.textContent = 'You Lose.'
  }
}

let choicesElem = document.querySelector('.js-moves')
function printChoices(choice, compChoice) {
  choicesElem.innerHTML = `You 
  <img src="images/${choice}-emoji.png" class="move-icon" alt="${choice}"> 
  - 
  <img src="images/${compChoice}-emoji.png" class="move-icon" alt="${compChoice}"> 
  Computer`;
}
let scoresElem = document.querySelector('.js-scores');
function updateScores() {
  scoresElem.textContent = `Wins: ${wins}, Losses: ${losses}, Ties: ${ties}`;
}
function resetScores() {
  scoresElem.textContent = 'Wins: 0, Losses: 0, Ties: 0'
  resultElem.textContent = ''
  choicesElem.textContent = ''


}
