// Call global variables
var gameSettings = JSON.parse(localStorage.getItem('no-mercy-settings'));
var gameResults = JSON.parse(localStorage.getItem('game-results'));
var userName = gameSettings.playerName;
var userScore = gameResults.userScore;
var userCorrect = gameResults.numCorrect;
var highScores = [];
var totalQs = gameSettings.numQ;
var gameCategory = gameSettings.category;
var funPhrases = ["Stupidity is far more fascinating than intelligence, after all intelligence has it's limits.",   // 0 or 1 right
                "Light travels faster than sound. This is why some people appear bright until they speak.",     // 2 or 3 right
                "The problem with the world is that intelligent people are full of doubts, while the stupid ones are full of confidence.", // 4 or 5 right
                "Artificial intelligence is no match for natural stupidity.",     // 6 or 7 right
                "Failure is simply the opportunity to begin again, this time more intelligently.",     // 8 or 9 right
                "Everyone is a genius a least once a year. The real geniuses simply have their bright ideas closer together.",     // 10 or 11 right
                "Intelligence is chasing you, and you're beating it so far.",     // 12 or 13 right
                "Sarcasm is the body’s natural defense against stupidity. I love sarcasm. It’s like punching people in the face but with words.",     // 14 or 15 right
                "There is no great genius without some touch of madness.",     // 16 or 17 right
                "Talent hits a target no one else can hit; Genius hits a target no one else can see.",     // 18 or 19 right
                "Nerd."]     // 20 or more right

// Function to display how well the user did on the screen
function displaySkills() {
    // define DOM elements we will be adding to
    var head = document.getElementById('winOrLose');
    var funPhrase = document.getElementById('funPhrase');

    // first display if the user passed the 75% threshold to "win"
    if (userCorrect/totalQs > 0.75) {
        head.innerHTML = "Congratulations! You won!"
    }
    else {
        head.innerHTML = "You lost!"
    }

    // next display a different phrase based on their total score
    var phraseIndex = Math.round(userScore/10);
    if (phraseIndex > 10) { phraseIndex = 10 };
    funPhrase.innerHTML = funPhrases[phraseIndex];
}

// Function to display their score to the page
function displayUserScore() {
    var dispScrEl = document.getElementById('col-3');
    dispScrEl.innerHTML = userScore;
}

// Function to display the high score history to the page
function displayHighScores() {
    var parentScores = document.getElementById('append-scores');

    // loop over the high scores to add each one
    for (let i = 0; i < highScores.length; i++) {
        const hs = highScores[i];
        var nm = hs[0];
        var scr = hs[1];
        var cat = hs[2];

        // create new elements and append each one
        var setOfDivs = document.createElement('div');
        var userDiv = document.createElement('div');
        var scoreDiv = document.createElement('div');
        var catDiv = document.createElement('div');
        var nameP = document.createElement('p');
        var scoreP = document.createElement('p');
        var catP = document.createElement('p');
        
        // Set needed classes for each DOM element
        setOfDivs.classList.add('columns', 'is-mobile');
        userDiv.classList.add('column', 'noPadding', 'is-one-third');
        scoreDiv.classList.add('column', 'noPadding', 'is-one-third');
        catDiv.classList.add('column', 'noPadding', 'is-one-third');
        nameP.classList.add('notification', 'is-info', 'is-light', 'justText');
        scoreP.classList.add('notification', 'is-info', 'is-light', 'justText');
        catP.classList.add('notification', 'is-info', 'is-light', 'justText');

        // Append each element on top of each other
        nameP.innerHTML = nm;
        scoreP.innerHTML = scr;
        catP.innerHTML = cat;
        catDiv.append(catP);
        scoreDiv.append(scoreP);
        userDiv.append(nameP);
        setOfDivs.append(userDiv, scoreDiv, catDiv);
        parentScores.append(setOfDivs);
    }
}

// Function to get data from local storage
function getUserScores() {
    // append highScores with this game, load history of scores and save them
    var savedScores = JSON.parse(localStorage.getItem('no-mercy-scores'));
    if (savedScores !== null) {
        highScores = savedScores;
        highScores.push([userName,userScore,gameCategory]);
    } else {
        highScores = [[userName,userScore ,gameCategory]];
    }
    localStorage.setItem('no-mercy-scores',JSON.stringify(highScores));
}

// function to initialize the page
function initPage() {
    getUserScores();
    displaySkills();
    displayUserScore();
    displayHighScores();
}

initPage();
document.addEventListener('DOMContentLoaded', () => {
  (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
    const $notification = $delete.parentNode;

    $delete.addEventListener('click', () => {
      $notification.parentNode.removeChild($notification);
    });
  });
});

function playAgain() {
    window.location.href = 'index.html';
}

$('#start-button').on('click', playAgain);