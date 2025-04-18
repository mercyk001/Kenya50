document.addEventListener('DOMContentLoaded', function() {
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
    const darkModeToggle = document.getElementById('darkModeToggle');

    console.log('Adding event listeners to buttons');

    drawCard1Button.addEventListener('click', () => { 
        if (currentPlayer === 1) {
            console.log('Draw Card 1 button clicked');
            drawCard(1);
        } else {
            alert("It's Player 2's turn!");
        }
    });

    drawCard2Button.addEventListener('click', () => { 
        if (currentPlayer === 2) {
            console.log('Draw Card 2 button clicked');
            drawCard(2);
        } else {
            alert("It's Player 1's turn!");
        }
    });

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    function startTimer() {
        timeLeft = 30;
        timerDiv.textContent = `Time Left: ${timeLeft}`;
        clearInterval(timer);
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

    function stopTimer() {
        clearInterval(timer);
    }

    function drawCard(player) {
        console.log(`Drawing card for player ${player}`);
        fetch('https://my-json-server.typicode.com/mercyk001/Kenya50/questions')  
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched questions:', data);

                const randomIndex = Math.floor(Math.random() * data.length);
                const card = data[randomIndex]; 
                displayCard(card, player);
                createAnswerOptions(card, player);
                if (player === currentPlayer) {
                    startTimer();
                }
            })
            .catch(error => console.error('Error fetching questions:', error));
    }

    function displayCard(card, player) {
        const cardDiv = player === 1 ? card1Div : card2Div;
        cardDiv.innerHTML = `<h3>${card.question}</h3>`; 
    }

    function createAnswerOptions(card, player) { 
        const answerOptionsDiv = player === 1 ? answerOptions1Div : answerOptions2Div;
        answerOptionsDiv.innerHTML = '';

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

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Answer';
        submitButton.addEventListener('click', () => {
            submitAnswer(card.correctAnswer, player);
            saveGameState(); 
        });
        answerOptionsDiv.appendChild(submitButton);
    }

    function submitAnswer(correctAnswer, player) {
        const selectedOption = document.querySelector(`input[name="answer${player}"]:checked`);
        if (selectedOption) {
            stopTimer(); 
            if (selectedOption.value === correctAnswer) {
                if (player === 1) {
                    player1Score += 10;
                    score1Div.textContent = `Score: ${player1Score}`;
                } else {
                    player2Score += 10;
                    score2Div.textContent = `Score: ${player2Score}`;
                }
            }
            switchPlayer();
            startTimer();
        } else {
            alert("Please select an answer before submitting.");
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    function saveGameState() {
        const gameState = {
            player1Score,
            player2Score,
            currentPlayer,
            timeLeft,
        };
        localStorage.setItem('kenya50GameState', JSON.stringify(gameState));
    }

    function loadGameState() {
        const savedState = localStorage.getItem('kenya50GameState');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            player1Score = gameState.player1Score;
            player2Score = gameState.player2Score;
            currentPlayer = gameState.currentPlayer;
            timeLeft = gameState.timeLeft;

            score1Div.textContent = `Score: ${player1Score}`;
            score2Div.textContent = `Score: ${player2Score}`;
            timerDiv.textContent = `Time Left: ${timeLeft}`;
        }
    }

    loadGameState();
    startTimer();
});