// Define global variables
var openTdbRootURL = 'https://opentdb.com/api.php';
var theTriviaRootURL = 'https://the-trivia-api.com/api';
var scoreHistory = [];
var categoryList = [];
    // categoryList is a list of objects with the follow values per line
    //      catName: ____
    //      APIused: "theTrivia" or "openTdb"
    //      id: (Note this is the underscore separated term for theTriviaAPI)

// Ease of Access for DOM elements - references
var nameInput = document.querySelector('#player-name')
var categorySection = document.querySelector('#categories-select');
//var difficultySection = document.querySelector('');
var difficultyInput = document.querySelector('#difficulty-select');
//var numQsSection = document.querySelector('');
var numQsInput = document.querySelector('#number-of-questions');
var startGameButton = document.querySelector('#start-button');

// Function to alphabatize the categories between the two APIs
function alphabatizeCategories() {
    categoryList.sort(function (a,b) {
        if (a.catName < b.catName) {
            return -1;
        }
        if (a.catName > b.catName) {
            return 1;
        }
        return 0;
    });
}

// Function to add a game category from the APIs
function addCategoryOption(category) {
    var newOption = document.createElement('option');
    newOption.id = category.id;
    newOption.textContent = category.catName;
    newOption.setAttribute('name',`${category.APIused}`);
    categorySection.append(newOption);
}

function initCategories() {
    // call APIs to get each possible category
    fetch(`${theTriviaRootURL}/categories`)
        .then(function (response) {
            return response.json();
        })
        .then(function (cats) {
            Object.entries(cats).forEach(([key,value]) => {
                var newCat = {
                    catName: key,
                    APIused: 'theTrivia',
                    id: value[0]
                };
                categoryList.push(newCat);
                alphabatizeCategories(); // Have to call each time we add a new value to the array
            });
        })
        .catch(function (er) {
            console.error(er);
        });

    fetch('https://opentdb.com/api_category.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (cats) {
            Object.entries(cats.trivia_categories).forEach(cat => {
                var newCat = {
                    catName: cat[1].name,
                    APIused: 'openTdb',
                    id: cat[1].id
                };
                categoryList.push(newCat);
                alphabatizeCategories();
            });
        })
        .catch(function (er) {
            console.error(er);
        });

    // Call alphabatizeCategories() to order the list by catName
    alphabatizeCategories();
    
    // Loop through addCategoryOption to add each option to the form
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const addAllCats = async () => {
        await delay(1500);
        console.log('Waited 1.5 seconds to load categories from APIs');
        for (let i = 0; i < categoryList.length; i++) {
            const cat = categoryList[i];
            addCategoryOption(cat);
        }
    }
    addAllCats();
}

// Function to disable the difficulty setting based on the API chosen
function toggleDifficulty (event) {
    // use the value in categoryInput to determine which API is being 
    // referenced to toggle difficulty on or off
}

// Function to save form responses to local storage as game settings
function saveSettings() {
    var optionChild = document.getElementById('categories-select').options.selectedIndex;
    var optionEl = categorySection.children[optionChild];
    console.log(optionEl);
    var settings = {
        playerName: nameInput.value,
        APIused: optionEl.getAttribute('name'),
        category: categorySection.value,
        catID: optionEl.id,
        numQ: 10
    }
    localStorage.setItem('no-mercy-settings',JSON.stringify(settings));
}

// Function to handle the form start based on the selected criteria
function startGame(event) {
    event.preventDefault();
    saveSettings();
    // open up play.html
    window.location.href = 'play.html';
}

initCategories();
//categorySection.addEventListener('submit',toggleDifficulty);
startGameButton.addEventListener('click',startGame);