// hangman.js - API or creating hangman games
var HangmanGame;
var startGame;
var setHangmanImages;
(function () {
    var GAME_STATUS = {
        gameNotStarted: 0,
        gameInProgress: 1,
        gameOver: 0
    };

    var gameStatus = GAME_STATUS.gameNotStarted;
    var words = [];
    var chars = ''
    var countHangman = 0
    var started = false

    var images = [];
    var gameOptions = {
        imageId: '',
        keyBoardId: '',
        startId: '',
        resetId: '',
        lettersId: ''
    };
    var Player = function () {
        this.wins = 0;
        this.losses = 0;
        this.gamesPlayed = 0;

        this.getPercentageWins = function () {
            return this.wins / this.gamesPlayed * 100;
        }
    };

    HangmanGame = (function () {
        var player = new Player();
        var initialzer = function (options) {
            gameOptions = options;
        }

        return initialzer;
    })();

    startGame = function () {
        gameStatus = GAME_STATUS.gameInProgress;
        // Selecting a random word from words array to start the game
        word = wordsData[Math.floor(Math.random() * wordsData.length)].toLowerCase();
  
        if (images.length !== 9) {
            images = [
                './Images/Empty.png',
                './Images/Pole.png',
                './Images/Beam.png',
                './Images/Head.png',
                './Images/Torso.png',
                './Images/RightLeg.png',
                './Images/LeftLeg.png',
                './Images/RightArm.png',
                './Images/LeftArm.png',
            ];
        }

        document.getElementById(gameOptions.imageId).setAttribute('src', images[0]);
        renderKeyBoardAtId(gameOptions.keyBoardId);

        renderHiddenLetters();
    }


    function setHangmanImages(imagePathsArray) {
        images = imagePathsArray;
    }

    function renderHiddenLetters() {
        // creating textfields for each character of the word and setting it to readonly
        for (var i = 0; i < word.length; i++) {
            var x = document.createElement('span');

            /**
             * Set the styles as an attribute on the HTMLElment in stored in a variable 
             * var = wordHTML = <input style="...";
             * Actually then you dont need an input element you can just use a div or span with * * styling and you can append the characters in the div or span when they choose it
             */
            document.getElementById(gameOptions.lettersId).appendChild(x);
            document.getElementById(gameOptions.startId).disabled = true;
            x.setAttribute('id', 'letter-' + i)
            x.setAttribute('maxlength', 1)
            x.setAttribute('readonly', 'readonly')
            chars = word.split("")

        }
    }

    function renderKeyBoardAtId(id) {
        var keyBoard = document.createElement('div');
        var keyBoardRow1 = document.createElement('div');
        var keyBoardRow2 = document.createElement('div');

        for (var i = 'a'.charCodeAt(0); i < 'n'.charCodeAt(0); i++) {
            var letter1 = String.fromCharCode(i);
            var button1 = document.createElement('button');
            button1.innerHTML = letter1.toUpperCase();
            button1.setAttribute('id', letter1);
            button1.onclick = function (event) {
                var letter = event.target.getAttribute('id');
                clickLetterHandler(letter);
            }
            keyBoardRow1.appendChild(button1);
        }
        for (var i = 'n'.charCodeAt(0); i < 'z'.charCodeAt(0) + 1; i++) {
            var letter2 = String.fromCharCode(i);
            var button2 = document.createElement('button');
            button2.innerHTML = letter2.toUpperCase();
            button2.setAttribute('id', letter2);
            button2.onclick = function (event) {
                var letter = event.target.getAttribute('id');
                clickLetterHandler(letter);
            }

            keyBoardRow2.appendChild(button2);
        }

        keyBoard.appendChild(keyBoardRow1);
        keyBoard.appendChild(keyBoardRow2);

        document.getElementById(id).appendChild(keyBoard);
    }
    function clickLetterHandler(letter) {
        var letterFound = 0;

        if (gameStatus === GAME_STATUS.gameInProgress) {
            document.getElementById(letter).disabled = true
            document.getElementById(letter).setAttribute('style', 'background-color:red')
            for (var i = 0; i < chars.length; i++) {
                if (chars[i] === letter) {
                    document.getElementById('letter-' + i).innerHTML = chars[i].toUpperCase();
                    letterFound = 1
                }
            }
            if (letterFound === 0) {
                countHangman++


                document.getElementById(gameOptions.imageId).setAttribute('src', images[countHangman])
                if (countHangman === 8) {
                    setTimeout(function () { alert('Game Over! You have been Hung!'); location.reload(); }, 0.5e3)
                    
                    gameStatus = GAME_STATUS.gameOver;
                }

            }
            var index = 0
            for (var i = 0; i < chars.length; i++) {
                if (document.getElementById('letter-' + i).innerHTML === chars[i].toUpperCase()) {
                    index += 1
              
                }
            }
            if (index === chars.length) {
                setTimeout(function () { alert('You suvived! You Won!'); location.reload(); }, 0.5e3)
            }
            index = 0

        }
    }

})();




// superHangman.js - a hangman game created using the hangman api 

var options = {
    imageId: 'man',
    keyBoardId: 'keyBoard',
    lettersId: 'letters',
    startId: 'start',
    resetId: 'reset'
};

var superHangMan = new HangmanGame(options);

var superHangManHtml = "<div>"
    + "<h1>HANGMAN</h1>"
    + "<button id='" + options.startId + "'  onClick='startGame()' >Start</button>"
    + "<button id='" + options.resetId + "'>Reset</button>"
    + "<div class='letters' id='" + options.lettersId + "'></div>"
    + "<div id='" + options.keyBoardId + "'></div>"
    + "<div><img id='" + options.imageId + "'></div>"
    + "</div>";

document.getElementById('app').innerHTML = superHangManHtml;









