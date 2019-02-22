## React/Redux Chess
A simple chess webapp in which you play as both players.

## Features
* Game state is remembered between page refreshes (using local storage)
* Clicking on a piece you control shows you the allowed moves you can make
* Tells you if you are in check, checkmate, or stalemate
* Game prevents you from moving your king into check
* Supports castling
* Supports en passant
* Supports pawn promotion

## To Do
* Write more tests
* Multiplayer and/or AI functionality

## Built With
* [Create React App](https://github.com/facebook/create-react-app) - to build the scaffolding
* [Lodash](https://lodash.com/) - to simplify some iterative logic
* [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) - for chess piece icons
* [Redux](https://redux.js.org/) - for managing application state
* [React Redux](https://react-redux.js.org/) - for binding React and Redux
* [Semantic UI](https://semantic-ui.com/) - for some styling

## Running This App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.