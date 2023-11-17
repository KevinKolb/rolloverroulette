// script.js
const db = firebase.firestore();

function playGame() {
  const playerName = document.getElementById('playerName').value;
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[randomIndex];

  const playerChoice = prompt('Choose: rock, paper, or scissors').toLowerCase();
  if (!choices.includes(playerChoice)) {
    alert('Invalid choice. Please choose rock, paper, or scissors.');
    return;
  }

  const result = determineWinner(playerChoice, computerChoice);

  // Display result
  document.getElementById('result').innerHTML = `Player ${playerName}'s choice: ${playerChoice}<br>
    Computer's choice: ${computerChoice}<br>
    Result: ${result}`;

  // Save result to Firebase
  saveResult(playerName, playerChoice, computerChoice, result);
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'It\'s a tie!';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
}

function saveResult(playerName, playerChoice, computerChoice, result) {
  db.collection('gameResults').add({
    playerName: playerName,
    playerChoice: playerChoice,
    computerChoice: computerChoice,
    result: result,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(docRef => {
    console.log('Result saved with ID: ', docRef.id);
  })
  .catch(error => {
    console.error('Error adding document: ', error);
  });
}
