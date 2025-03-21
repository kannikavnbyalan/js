const wordList = [
    { word: "python", hint: "programming language" },
    { word: "guitar", hint: "a musical instrument" },
    { word: "aim", hint: "a purpose or intention" },
    { word: "venus", hint: "planet of our solar system" },
    { word: "gold", hint: "a yellow precious metal" }
];

const typingInput = document.querySelector(".typing-input");
const inputs = document.querySelector(".inputs");
const hintTag = document.getElementById("hint");
const guessLeft = document.getElementById("guess-left");
const wrongLetter = document.getElementById("wrong-letters");
const resetBtn = document.getElementById("reset-btn");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = [];
    incorrectLetters = [];

    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters.join(", ");

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[a-z]$/) && !incorrectLetters.includes(key) && !correctLetters.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    correctLetters.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(key);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters.join(", ");
    }
    typingInput.value = "";

    setTimeout(() => {
        if (correctLetters.length === word.length) {
            alert(`Congrats! You found the word: ${word.toUpperCase()}`);
            randomWord();
        } else if (maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

randomWord();
