# Numbers game from the gameshow Countdown
Designed for desktop using Electron JS, but will work in browsers (not designed for mobile use at this time. Focus was for readability on large displays). Intended for classroom or party settings. 

## Requirments
NodeJS and Electron. In order to run this program, you will need to have Node and Electron installed. Node can be downloaded from https://nodejs.org/en/download/. Once installed, Electron can be installed via NPM using the command "npm install" via a terminal/command prompt, which will install dependencies including Electron. Once done, you can run the app using the command "npm start" from within the name "Numbers" folder. 

## How to Play: 
Numbers is a puzzle game that tests your ability to quickly manipulate a given set of numbers to reach a target number. This app gives you the tools to play in a classroom or with a group of friends. Think of it as a gameboard. Designed for smartboard and projector displays, you are giving plenty of space to write "on" the window for demostration purposes. 

To play, you will select how many large numbers you want by using the dropdown box on the bottom of the window and hitting Set. Once done, the app will randomly select that many large numbers from a set, and fill the rest of the spots with randomly selected small numbers from another set. Once you have those numbers written down and everyone is ready with their own paper and pencil, hit Play. This wil randomly generate a 3 digit number as the target, and start the timer (standard time is 30 seconds, but this can be adjusted as you wish). The goal is to get as close to the target number as possible using only the 6 numbers provided. You can only use basic operations (addition, subtraction, multiplication, and division) and can only use each number once. You can not have a negative number or fraction at any part in your solution. You can not concatenate (you can't use "2" and "2" to make "22"). You do not have to use all of the numbers. The person closest to the target number wins the round. Scoring values can be found on the Rules popup. 

Timer - Toggles timer on/off. 

Rules - Displays the rules of the game

Demo - Shows simple puzzle for demonstration purposes

Hard Mode - Replaces standard large numbers with 12, 37, 62, 87

Set - Sets desired number of large numbers for puzzle based on selection, then populates rest of slots with 
small numbers.

Play - Generates target number and starts timer

Reset - Resets everything to default (clears target and selected numbers, resets timer)

View (desktop app only) - Allows for zooming in and out

## Code Louisiville requirements:
-Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application

-Create and use a function that accepts two or more values (parameters), calculates or determines a new value based on those inputs, and returns a new value

-Develop your project using a common JavaScript framework such as React, Angular, Vue, etc.(Electron)