document.addEventListener("DOMContentLoaded", () => {
    
    const gameContainer = document.getElementById("game-container");
    const drawCardButton = document.getElementById("draw-card");
    const cardName = document.getElementById("card-name");
    const cardDescription = document.getElementById("card-description");
    const cardPoints = document.getElementById("card-points");
    const cardCategory = document.getElementById("card-category");

    drawCardButton.addEventListener("click", drawCard);

    function drawCard() {
        fetch("http://localhost:3000/cards")
        .then(response =>response.json())
        .then(data => {
            const card =data[Math.floor(Math.random()* data.length)];
            displayCard(card);
        })
        //console.log("Card Drawn");
        .catch(error => console.error("Error fetching card data:", error));
    }

    function displayCard(card){
        cardName.textContent = card.name;
        cardDescription.textContent = card.description;
        cardPoints.textContent = card.points;
        cardCategory.textContent = card.category
    }
        
})