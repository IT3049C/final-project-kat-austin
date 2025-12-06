export const config = Object.freeze({
  /** Corresponds to number of columns. */
  wordLength: 5,
  /** Corresponds to number of rows. */
  attemptNum: 6,
});

/**
 * Checks if the given text is a real word.
 * @param {string} word
 */
export async function isWordValid(word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return response.ok;
}

export async function getRandomWord() {
  const response = await fetch(
    `https://random-word-api.herokuapp.com/word?length=${config.wordLength}`
  );
  const data = await response.json();
  return data[0];
}

/**
 * @param {string} guess
 * @param {string} targetWord
 */
export function checkWord(guess, targetWord) {
  const targetLetters = targetWord.toLowerCase().split("");
  const guessLetters = guess.toLowerCase().split("");

  return guessLetters.map((letter, i) => {
    if (letter === targetLetters[i]) {
      return "correct";
    } else if (targetLetters.includes(letter)) {
      return "misplaced";
    } else {
      return "incorrect";
    }
  });
}