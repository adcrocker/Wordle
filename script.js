var currentSquare = 0;
var currentRow = 0;
var currentWord = "hello"
var wordGuessed = false

// List of all squares.
var squares = document.getElementsByClassName('square')
// List of all rows.
var rows = document.getElementsByClassName('row')

window.addEventListener('keydown', (e) => {
    // Get the type of key pressed.
    var letterType = e.code
    if (letterType.includes('Key')) {
        // Add a new letter to the grid.
        addNewLetter(e.key)
    } else if (e.keyCode == 8) {
        // Remove previous letter from the grid.
        removeLetter()
    } else if (e.keyCode == 13) {
        // Check five character words.
        checkWord()
    }
})

// Adds a new letter to the grid.
function addNewLetter(letter) {
    // Check to make sure letters are on the right row.
    if (Math.floor(currentSquare / 5) == currentRow) {
        // Make sure there are spaces available.
        if (currentSquare <= 29 && !wordGuessed) {
            // Get the current square.
            var square = squares[currentSquare]
            // Add the letter and style.
            square.classList.add('guessed')
            square.children[0].textContent = letter
            // Increase current letter spot.
            currentSquare++
        }
    }
}

// Removes previous letter from the grid.
function removeLetter() {
    // Check to make sure letters are on the right row.
    if (Math.floor((currentSquare - 1) / 5) == currentRow) {
        // Make sure there are spaces available.
        if (currentSquare > 0 && !wordGuessed) {
            // Get the current square.
            var square = squares[currentSquare - 1]
            // Remove the letter and style.
            square.classList.remove('guessed')
            square.children[0].textContent = ""
            // Decrease current letter spot.
            currentSquare -= 1
        }
    }
}

// Checks five letter words.
function checkWord() {
    // Set up a temporary string.
    var guess = ""
    // Get the current row.
    var row = rows[currentRow]
    // Get row's children.
    var squares = row.children
    // Get each guess and add it to the template.
    for (var x = 0; x < squares.length; x++) {
        guess += squares[x].children[0].textContent
    };
    // Get the styles of each letter.
    var styles = getLetterStyles(guess)
    // Loop through and apply the styles.
    for (var x = 0; x < squares.length; x++) {
        squares[x].classList.add(styles[x])
    };
    // Check if words match.
    if (guess == currentWord) {
        wordGuessed = true
    }
    // Check if word wasn't guessed.
    if (currentRow == 5 && !wordGuessed) {
        alert(`The correct word is: ${currentWord}.`)
    };
    // Increase the row number by one.
    currentRow++ 
}

// Get the styles of each letter.
function getLetterStyles(guess) {
    // Create a list of letter styles.
    var styles = []
    // Loop through and compare letters.
    for (var x = 0; x < guess.length; x++) {
        if (guess[x] == currentWord[x]) {
            // Add included class to styles.
            styles.push('included')
        } else if (currentWord.includes(guess[x])) {
            // Add flagged class to styles.
            styles.push('flagged')
        } else {
            // Add excluded class to styles.
            styles.push('excluded')
        }
    };
    // Return the list of styles.
    return styles;
}