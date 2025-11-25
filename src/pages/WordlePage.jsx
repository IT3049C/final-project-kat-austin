import { useEffect, useState } from "react";
import {
  checkWord,
  config,
  getRandomWord,
  isWordValid,
} from "../logic/wordle.js";

const targetWord = (await getRandomWord()).toUpperCase();
console.log(`Target word is: ${targetWord}`);

export function WordlePage() {
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [grid, setGrid] = useState(setupGrid());
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return lockInput;
  });

  /**
   * Prevents further input into wordle squares.
   */
  function lockInput() {
    document.removeEventListener("keydown", handleKeydown);
  }

  /**
   * @param {string} letter
   */
  function addLetterToGrid(letter) {
    const gridIndex = grid.findIndex(
      (v) => v.row === currentAttempt && v.col === currentPosition
    );

    if (gridIndex !== -1) {
      const nextGrid = grid.map((v, i) => {
        if (i === gridIndex) {
          return { ...v, letter };
        } else {
          return v;
        }
      });
      setGrid(nextGrid);
      //animateElement(cell, "bounceIn");
      setCurrentPosition(currentPosition + 1);
    }
  }

  function removeLetterFromGrid() {
    if (currentPosition > 0) {
      const position = currentPosition - 1;
      const gridIndex = grid.findIndex(
        (v) => v.row === currentAttempt && v.col === position
      );

      if (gridIndex !== -1) {
        const nextGrid = grid.map((v, i) => {
          if (i === gridIndex) {
            return { ...v, letter: "" };
          } else {
            return v;
          }
        });
        setGrid(nextGrid);
      }
      setCurrentPosition(position);
    }
  }

  function revealAttemptResult() {
    if (grid.length > currentAttempt) {
      const row = grid.filter((v) => v.row === currentAttempt);
      let guess = "";

      row.forEach((v) => (guess += v.letter));

      const result = checkWord(guess, targetWord);

      for (let col = 0; col < result.length; col++) {
        const gridIndex = grid.findIndex(
          (v) => v.row === currentAttempt && v.col === col
        );

        if (gridIndex !== -1) {
          // setTimeout(() => {
          //   animateElement(cell, "flipInX");
          //   cell.classList.add(result[col]);
          // }, col * 300);
          setGrid((g) =>
            g.map((v, i) => {
              if (i === gridIndex) {
                return { ...v, result: result[col] };
              } else {
                return v;
              }
            })
          );
        }
      }
    }
  }

  async function submitGuess() {
    if (currentPosition < config.wordLength) {
      //shakeMissingCells(currentAttempt);
      alert("Word is incomplete.");
    } else {
      const row = grid.filter((v) => v.row === currentAttempt);
      let guess = "";

      row.forEach((v) => (guess += v.letter));

      if (!(await isWordValid(guess))) {
        //shakeRow();
        alert("Please enter a real word.");
      } else if (guess.toUpperCase() === targetWord) {
        lockInput();
        revealAttemptResult();
        setResultText("You Win!");
      } else {
        revealAttemptResult();

        setCurrentAttempt(currentAttempt + 1);
        setCurrentPosition(0);
      }
    }
    if (currentAttempt >= config.attemptNum) {
      lockInput();
      setResultText("Game Over!");
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
    if (isLetter(e.key)) {
      console.log(`letter: ${e.key}`);
      
      addLetterToGrid(e.key);
    } else if (e.key === "Backspace") {
      removeLetterFromGrid();
    } else if (e.key === "Enter") {
      submitGuess();
    }
  }

  return (
    <main>
      <header>
        <h2>Wordle</h2>
      </header>
      <div id="game">
        <p id="game-result">{resultText}</p>
        <div
          id="wordle-grid"
          style={{ gridTemplateColumns: `repeat(${config.wordLength}, 60px)` }}
        >
          {grid.map((v, i) => (
            <div
              key={i}
              className={`letter ${v.result}`}
              id={`cell-${v.row}-${v.col}`}
            >
              {v.letter}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function setupGrid() {
  const grid = [];

  for (let row = 0; row < config.attemptNum; row++) {
    for (let col = 0; col < config.wordLength; col++) {
      grid.push({ row, col, letter: "", result: "" });
    }
  }
  return grid;
}

/**
 * @param {string} letter
 */
function isLetter(letter) {
  return letter.length === 1 && letter.match(/[a-z]/i);
}
