# Tic-Tac-Toe

## Overview

This is my version of the age-old game Tic-Tac-Toe. This is my final project for Mod 1 at the Turing School of Software and Design. The purpose of the application is to allow one to two users to enjoy a fully playable version of tic-tac-toe. 

The spec for the project can be found [here](https://frontend.turing.io/projects/module-1/tic-tac-toe-solo.html).

The live site can be found [here](https://cjspohn.github.io/tic-tac-toe/).

## Prerequisites

There are no prerequisite programs or tools needed. The app runs in a browser and does not require downloads. User wins are stored in local storage within the browser and persist on page refresh.

## Using the App

When you want to play a piece, click the desired spot on the game board and the current player's game piece will appear. 

<img src="https://user-images.githubusercontent.com/69563078/98718707-0303cf00-234c-11eb-8a3b-c724373b5069.png" width="300" height="250">

The turn display at the top will automatically change which player's turn it is to place a piece. Additionally, after every game ends, whichever player went second previously, will now be able to go first. 

<img src="https://user-images.githubusercontent.com/69563078/98718783-1f077080-234c-11eb-9394-7406cd2a3aeb.png">

<img src="https://user-images.githubusercontent.com/69563078/98718793-229af780-234c-11eb-8f93-dc169432bb66.png">

A win in tic-tac-toe is achieved by connecting 3 pieces by column, row, or the diagonals.

<img src="https://user-images.githubusercontent.com/69563078/98718866-3b0b1200-234c-11eb-9505-4dcf06104241.png" width="250" height="200">
<img src="https://user-images.githubusercontent.com/69563078/98718870-3cd4d580-234c-11eb-9f36-13fc0ecec84a.png" width="250" height="150">
<img src="https://user-images.githubusercontent.com/69563078/98718881-3e9e9900-234c-11eb-8157-5fad0c186af9.png" width="250" height="200">

Once a player wins the board animates the winning pieces and automatically resets for the next game. 

Optionally, a user can choose to play against an AI opponenet by clicking the "Play Against Computer" button. 
<img width="242" alt="Screen Shot 2020-11-24 at 4 58 48 PM" src="https://user-images.githubusercontent.com/69563078/100165104-9ffb5780-2e76-11eb-92f8-f26367b2afd8.png">

From here, a user can choose to select an "easy" or a "hard" opponent by selecting the corresponding radio button.
<img width="252" alt="Screen Shot 2020-11-24 at 4 58 55 PM" src="https://user-images.githubusercontent.com/69563078/100165103-9e319400-2e76-11eb-9ff3-1251e0fedb56.png">

The easy opponent will pick a random available space on the game board to play. The hard opponent utilizes the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax) to find the optimal space to play on the board so that it will never lose. My minimax functionality was derived from [this project](https://github.com/beaucarnes/fcc-project-tutorials/tree/master/tictactoe).

## Languages

This project was written using HTML, CSS, and JavaScript. 

HTML and CSS ahere to:
* [BEM naming conventions](http://getbem.com/naming/)
* [Idiomatic CSS](https://github.com/necolas/idiomatic-css)

JavaScript adheres to:
* [MDN Doc](https://developer.mozilla.org/en-US/)

And all code follows the Turing Style Guides
* [Javascript](https://github.com/turingschool-examples/javascript)
* [HTML](https://github.com/turingschool-examples/html)
* [CSS](https://github.com/turingschool-examples/css)

## Authors

[Chris Spohn](https://github.com/CJSpohn)

## Special Thanks

My mentor [Jon Sweet](https://github.com/JSweet314)

My good friend [Chris Meyer](https://github.com/chris023)
