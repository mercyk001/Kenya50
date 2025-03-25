let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let timer;
let timeLeft = 30;

const drawCard1Button = document.getElementById('drawCard1');
const drawCard2Button = document.getElementById('drawCard2');
const card1Div = document.getElementById('card1');
const card2Div = document.getElementById('card2');
const answerOptions1Div = document.getElementById('answerOptions1');
const answerOptions2Div = document.getElementById('answerOptions2');
const score1Div = document.getElementById('score1');
const score2Div = document.getElementById('score2');
const timerDiv = document.getElementById('timer');

drawCard1Button.addEventListener('click', () => drawCard(1));
drawCard2Button.addEventListener('click', () => drawCard(2));
document.addEventListener('DOMContentLoaded', startTimer);

function startTimer() {
    timeLeft = 30; // Reset time left
    timerDiv.textContent = `Time Left: ${timeLeft}`;
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("TIMEOUT! Player " + currentPlayer + " loses their turn.");
            switchPlayer();
        } else {
            timerDiv.textContent = `Time Left: ${timeLeft}`;
            timeLeft--;
        }
    }, 1000);
}

function drawCard(player) {
    fetch('http://localhost:3000/questions')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const card = data[randomIndex];
            displayCard(card, player);
            createAnswerOptions(card, player);
            if (player === currentPlayer) {
                startTimer(); // Start timer for the current player
            }
        });
}

function displayCard(card, player) {
    const cardDiv = player === 1 ? card1Div : card2Div;
    cardDiv.innerHTML = `<h3>${card.question}</h3>`;
}

function createAnswerOptions(card, player) {
    const answerOptionsDiv = player === 1 ? answerOptions1Div : answerOptions2Div;
    answerOptionsDiv.innerHTML = ''; // Clear previous options

    card.options.forEach(option => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `answer${player}`;
        radio.value = option;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        answerOptionsDiv.appendChild(label);
        answerOptionsDiv.appendChild(document.createElement('br'));
    });

    // Add a button to submit the answer
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Answer';
    submitButton.addEventListener('click', () => submitAnswer(card.correctAnswer, player));
    answerOptionsDiv.appendChild(submitButton);
}

function submitAnswer(correctAnswer, player) {
    const selectedOption = document.querySelector(`input[name="answer${player}"]:checked`);
    if (selectedOption) {
        if (selectedOption.value === correctAnswer) {
            if (player === 1) {
                player1Score += 10;
                score1Div.textContent = `Score: ${player1Score}`;
            } else {
                player2Score += 10;
                score2Div.textContent = `Score: ${player2Score}`;
            }
        }
        switchPlayer(); // Switch to the other player after answering
    } else {
        alert("Please select an answer before submitting.");
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    // Reset the timer for the new player
    startTimer();
}