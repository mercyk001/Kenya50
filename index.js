document.addEventListener('DOMContentLoaded', function() {
    // Variables to keep track of player scores and the current player
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = 1; // 1 represents Player 1, 2 represents Player 2
    let timer; // Variable to store the timer
    let timeLeft = 30; // Time left for each player to answer in seconds

    // Get references to the HTML elements
    const drawCard1Button = document.getElementById('drawCard1');
    const drawCard2Button = document.getElementById('drawCard2');
    const card1Div = document.getElementById('card1');
    const card2Div = document.getElementById('card2');
    const answerOptions1Div = document.getElementById('answerOptions1');
    const answerOptions2Div = document.getElementById('answerOptions2');
    const score1Div = document.getElementById('score1');
    const score2Div = document.getElementById('score2');
    const timerDiv = document.getElementById('timer');

    // Log a message to show that event listeners are being added to the buttons
    console.log('Adding event listeners to buttons');

    // Add click event listeners to the "Draw Card" buttons
    drawCard1Button.addEventListener('click', () => {
        if (currentPlayer === 1) {
            console.log('Draw Card 1 button clicked');
            drawCard(1); // Call the drawCard function for Player 1
        } else {
            alert("It's Player 2's turn!"); // Alert if it's not Player 1's turn
        }
    });
    drawCard2Button.addEventListener('click', () => {
        if (currentPlayer === 2) {
            console.log('Draw Card 2 button clicked');
            drawCard(2); // Call the drawCard function for Player 2
        } else {
            alert("It's Player 1's turn!"); // Alert if it's not Player 2's turn
        }
    });

    // Function to start the timer
    function startTimer() {
        timeLeft = 30; // Reset the time left to 30 seconds
        timerDiv.textContent = `Time Left: ${timeLeft}`;
        clearInterval(timer); // Clear any existing timer
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("TIMEOUT! Player " + currentPlayer + " loses their turn.");
                switchPlayer(); // Switch to the other player if time runs out
            } else {
                timerDiv.textContent = `Time Left: ${timeLeft}`;
                timeLeft--;
            }
        }, 1000); // Decrease the time left by 1 second every second
    }

    // Function to stop the timer
    function stopTimer() {
        clearInterval(timer);
    }

    // Function to draw a card for a player
    function drawCard(player) {
        console.log(`Drawing card for player ${player}`);
        fetch('http://localhost:3000/questions') // Fetch questions from the server
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok'); // Throw an error if the network response is not ok
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched questions:', data);
                const randomIndex = Math.floor(Math.random() * data.length); // Get a random question
                const card = data[randomIndex];
                displayCard(card, player); // Display the question for the player
                createAnswerOptions(card, player); // Create answer options for the player
                if (player === currentPlayer) {
                    startTimer(); // Start the timer for the current player
                }
            })
            .catch(error => console.error('Error fetching questions:', error));
    }

    // Function to display a card (question) for a player
    function displayCard(card, player) {
        const cardDiv = player === 1 ? card1Div : card2Div;
        cardDiv.innerHTML = `<h3>${card.question}</h3>`;
    }

    // Function to create answer options for a player
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

    // Function to submit an answer
    function submitAnswer(correctAnswer, player) {
        const selectedOption = document.querySelector(`input[name="answer${player}"]:checked`);
        if (selectedOption) {
            stopTimer(); // Stop the timer when the answer is submitted
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
            startTimer(); // Start the timer for the new player
        } else {
            alert("Please select an answer before submitting.");
        }
    }

    // Function to switch to the other player
    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    // Start the initial timer when the page loads
    startTimer();
});