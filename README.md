# Kenya 50 Card Game

## Description
The Kenya 50 Card Game is a Single Page Application (SPA) built using HTML, CSS, and JavaScript. This application simulates a card game where users can draw cards representing different animals, each with unique attributes such as name, description, points, and category. The game communicates with a local JSON server to fetch the card data.


## Project Structure
- `index.html`: The main HTML file that serves as the entry point for the SPA.
- `style.css`: The CSS file for styling the application.
- `index.js`: The JavaScript file that handles the application's interactivity and API integration.
- `db.json`: The JSON file containing the card data used by the JSON server. In the terminal, input these; a. npm install -g json-server(This installs the json server)   b. json-server --watch db.json (This starts the server)

 ## Features/ Project requirements.
- Single Page Application**: The entire app runs on a single page with no redirects or reloads.
- Interactive Cards**: Users can draw random cards with unique attributes.
- Event Listeners**: The application incorporates multiple event listeners for user interactions.
- Asynchronous Data Fetching**: All interactions between the client and the API are handled asynchronously using JSON as the communication format.

## MVPs
1. Gameplay
2. scoring
3. Progression
4. Save Progress.


## References.
1. https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript

2. https://stackoverflow.com/questions/5978519/how-can-i-use-setinterval-and-clearinterval

3. https://www.w3schools.com/jsref/dom_obj_radio.asp

4. https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/