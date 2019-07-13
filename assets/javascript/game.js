$(document).ready(function() {

    let possibleCities = [ "singapore", "dubai", "istanbul", "florence", "paris", "madrid", "rome", "seoul", "new york city", 
                            "shanghai",  "tokyo", "sydney","bamako", "tripoli", "toronto", "beijing", "moscow",
                            "johannesburg", , "warsaw", "jakarta", "kuala lumpur", "mexico city",
                            "hong kong", "chicago",  "los angeles", "mumbai", "dhaka", "london", "monte video"]

    const maxGuess = 10
    let pauseGame = false

    let guessedLetters = []
    let guessingWord = []
    let wordToMatch
    let numGuess
    let wins = 0
    let loses = 0

    resetGame()

    // Wait for key press
    document.onkeypress = function(event) {
        // Make sure key pressed is an alpha character
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toLowerCase())
        }
    }

    // Game Functions
    // Check if letter is in word & process
    function checkForLetter(letter) {
        let foundLetter = false
        let correctSound = document.createElement("audio")
        let incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src", "assets/audio/tibetan-bell.mp3")
        incorrectSound.setAttribute("src","assets/audio/radio-tune.mp3")

        // Search string for letter
        for (let i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play()
                // If guessing word matches random word
                if (guessingWord.join("") === wordToMatch) {
                    // Increment # of wins
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame,5000)
                } 
                
            }
        }
        

        if (!foundLetter) {
            incorrectSound.play()
            // Check if inccorrect guess is already on the list
            if (!guessedLetters.includes(letter)) {
                // Add incorrect letter to guessed letter list
                guessedLetters.push(letter)
                // Decrement the number of remaining guesses
                numGuess--
            }
            if (numGuess === 0) {
                // Display word before reseting game
                loses++
                guessingWord = wordToMatch.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }

        updateDisplay()

    }
    // Check in keypressed is between A-Z or a-z
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        // Get a new word
        wordToMatch = possibleCities[Math.floor(Math.random() * possibleCities.length)].toLowerCase()
        console.log(wordToMatch)

        // Reset word arrays
        guessedLetters = []
        guessingWord = []

        // Reset the guessed word
        for (let i=0, j=wordToMatch.length; i < j; i++){
            // Put a space instead of an underscore between multi word "words"
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push("_")
            }
        }

        // Update the Display
        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("currentWord").innerText = guessingWord.join("")
        document.getElementById("remainingGuesses").innerText = numGuess
        document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
        document.getElementById("totalLoses").innerText = loses
    }
})

