'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateHint = (guess) => {
  //? Create variables "solutionArray" and "guessArray"
  // #Using split() method to convert strings to arrays.
  let solutionArray = solution.split('');
  // console.log(solutionArray);
  let guessArray = guess.split('');
  // console.log(guessArray);
  //? Spec 2.2 - Determine correct "letter-locations"
  let correctLetterLocations = 0;
  let correctLetters = 0;
  // # Looping through solutionArray to test if the letter in the guessArray at the same index as we are currently on in the solutionArray matches the current "letter". If so, we increase the "CorrectLetterLocation variable by 1, and we set the element in the solution array to null."
  solutionArray.forEach((letter, index) => {
    if (letter === guessArray[index]) {
      correctLetterLocations++;
      solutionArray[index] = null;
    }
    //? Spec 2.3 - Determine correct "letters" in guessArray
    // # While looping through the solutions array we are checking to see if the letter in the same position of the guessArray appears anywhere in the solution array, by using the indexOf() method. If it is, the indexOf() method will return the index of where that letter exists in the solutionArray. If not, it will return a -1. We set that to a variable, and if that variable is greater than -1 (meaning it does exist) we add 1 to the correctLetters variable and we set the value of the element in the solution array where that element exists to null.
    let targetIndex = solutionArray.indexOf(guessArray[index]);
    // console.log(`SolutionArray: ${solutionArray}`);
    if (targetIndex > -1) {
      solutionArray[targetIndex] = null;
      correctLetters += 1;
    }
    // console.log(`${guessArray[index]}: ${targetIndex}`);
  });
  // console.log(correctLetterLocations);
  // console.log(correctLetter);

  // # Using the value totals from the above loop to generate the hint.
  let hint = `${correctLetterLocations}-${correctLetters}`;
  // # Pushing the guess and hint variable to the board array.
  board.push(`${guess}${hint}`);
  // console.log(hint);
  console.log(board);
  return hint;
};

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (guess === solution) {
    return 'You guessed it!';
  } else if (board.length >= 9) {
    console.log(`You suck, You are out of tries.`);
  } else {
    generateHint(guess);
  }
};

const getPrompt = () => {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
};

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });
  });
} else {
  generateSolution();
  getPrompt();
}
