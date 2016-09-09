'use strict';

//arrays to hold data
var animalsArray = ['imgs/animals/alligator.jpg', 'imgs/animals/bear.png', 'imgs/animals/cat.jpg', 'imgs/animals/chicken.jpg', 'imgs/animals/cow.jpg', 'imgs/animals/deer.jpg', 'imgs/animals/dog.jpg', 'imgs/animals/eagle.jpg', 'imgs/animals/elephant.jpg', 'imgs/animals/flamingo.jpg', 'imgs/animals/giraffe.jpg', 'imgs/animals/gorilla.jpg', 'imgs/animals/hippo.jpg', 'imgs/animals/horse.jpg', 'imgs/animals/lion.jpg', 'imgs/animals/lizard.jpg', 'imgs/animals/mouse.jpg', 'imgs/animals/parrot.jpg', 'imgs/animals/pig.jpg', 'imgs/animals/sheep.jpg', 'imgs/animals/sloth.jpg', 'imgs/animals/snake.jpg', 'imgs/animals/tiger.jpg', 'imgs/animals/turtle.jpg'];

var cardsArray = ['imgs/cards/10clubs.jpg', 'imgs/cards/10hearts.png', 'imgs/cards/acehearts.jpg', 'imgs/cards/acespades.jpg', 'imgs/cards/jackdiamonds.jpg', 'imgs/cards/jackspades.jpg', 'imgs/cards/joker1.jpg', 'imgs/cards/joker2.png', 'imgs/cards/kinghearts.jpg', 'imgs/cards/kingspades.jpg', 'imgs/cards/queenhearts.jpg', 'imgs/cards/queenspades.jpg', 'imgs/cards/10spades.png', 'imgs/cards/10diamonds.png', 'imgs/cards/jackhearts.png', 'imgs/cards/jackclubs.png', 'imgs/cards/queendiamonds.jpg', 'imgs/cards/queenclubs.jpg', 'imgs/cards/kingdiamonds.png', 'imgs/cards/kingclubs.png', 'imgs/cards/aceclubs.png', 'imgs/cards/acediamonds.png', 'imgs/cards/joker3.jpg', 'imgs/cards/joker4.jpg' ];

var moviesArray = ['imgs/posters/alien.jpg', 'imgs/posters/avengers.jpg', 'imgs/posters/backtothefuture.jpg', 'imgs/posters/bladerunner.jpg', 'imgs/posters/darkknight.jpg', 'imgs/posters/deadpool.jpg', 'imgs/posters/findingnemo.jpg', 'imgs/posters/forceawakens.jpg', 'imgs/posters/ghostbuster.jpg', 'imgs/posters/greatoutdoors.jpg', 'imgs/posters/hackers.jpg', 'imgs/posters/hotfuzz.jpg', 'imgs/posters/indianajones.jpg', 'imgs/posters/jaws.jpg', 'imgs/posters/johnwick.jpg', 'imgs/posters/jurassicpark.jpg', 'imgs/posters/martian.jpg', 'imgs/posters/meangirls.jpg', 'imgs/posters/notebook.jpg', 'imgs/posters/rocky.jpg', 'imgs/posters/silenceofthelambs.jpg', 'imgs/posters/startrek.jpg', 'imgs/posters/starwars.jpg'];

var cardDictionary = {
  animals: animalsArray,
  cards: cardsArray,
  movies: moviesArray,
};

// Variables to capture game level
var level;
var level1;
var key1;
var imageArray = [];
var altImage = 'imgs/back.png';
// counts correct pairs
var countCorrect = 0;
// counts total clicks
var countTotal = 0;
// selects game table
var picSelector;
// creates array which clicked choices will be stored
var choiceArray = [];
// creates array to prevent the same image from being chosen
var choiceIndexArray = [];
// creates array to house correctly answered pairs
var correctPairs = [];
// allows for flipping of cards
var firstChoice = null;
// allows for disabling clicking during timeOut function
var selecting = false;
// holds the current player object
var playerObject;

var shuffledArray;

// function to parse from local storage and grab level
function getGameParam(){
  level = JSON.parse(localStorage.getItem('current_player'));
  level1 = level.level;
  key1 = level.cardset;
};

function shuffleArray(array){
  for (var i = array.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  return array;
};

function grabItems(array, difficulty) {
  var itemsNeeded = 0;
  if (difficulty === 'easy') {
    itemsNeeded = 3;
  } else if (difficulty === 'medium') {
    itemsNeeded = 6;
  } else {
    itemsNeeded = 12;
  };
  for (var i = 0; i < itemsNeeded; i++) {
    imageArray.push(array[i]);
    imageArray.push(array[i]);
  };
};


//function to flip cards and allow for setTimout
function flipCards(event, faceDown) {
  selecting = false;
  event.target.setAttribute('src', faceDown);
  event.target.setAttribute('class', 'flipback');
  firstChoice.setAttribute('src', faceDown);
  firstChoice.setAttribute('class', 'flipback');
  firstChoice = null;
  event.target.disable = false;
};

function pushCctPairs() {
  correctPairs.push(choiceArray[0]);
  choiceArray = [];
  choiceIndexArray = [];
  countCorrect += 1;
  firstChoice = null;
};

function finished(){
  playerObject = updatePlayerInfo(countTotal);
  pullPushHighScoreArray(playerObject);
  alert('Congratulations! You solved the game in ' + countTotal + ' clicks!');
  window.location = 'about-info.html';
};

function choiceNotMatching(event, faceDown) {
  selecting = true;
  setTimeout(function(){flipCards(event, faceDown);}, 1000);
  choiceArray = [];
  choiceIndexArray = [];
};

function pullPushHighScoreArray(object) {
  var jsonArray;
  var updatedArray;
  var newArray;
  if (localStorage.getItem('high_score_array')) {
    jsonArray = JSON.parse(localStorage.getItem('high_score_array'));
    jsonArray.push(object);
    updatedArray = JSON.stringify(jsonArray);
    localStorage.setItem('high_score_array', updatedArray);
  } else {
    newArray = JSON.stringify([object]);
    localStorage.setItem('high_score_array', newArray);
  };
};

function updatePlayerInfo(countTotal) {
  var playerObject;
  var returnPlayer;
  playerObject = JSON.parse(localStorage.getItem('current_player'));
  playerObject.score = countTotal;
  returnPlayer = JSON.stringify(playerObject);
  localStorage.setItem('current_player', returnPlayer);
  return playerObject;
};

function buildTable(imageArray){
  var iA = 0;
  var table = document.getElementById('game_table');
  var tRow;
  var tData;
  var image;
  for (var r = 0; r < (imageArray.length / 6); r++){
    tRow = document.createElement('tr');
    for (var c = 0; c < 6; c++){
      tData = document.createElement('td');
      image = document.createElement('img');
      image.setAttribute('faceup', imageArray[iA]);
      image.setAttribute('facedown', altImage);
      image.setAttribute('src', altImage);
      image.setAttribute('index', iA);
      iA += 1;
      tData.appendChild(image);
      tRow.appendChild(tData);
    };
    table.appendChild(tRow);
  };
};

function clickHandler(event){
  //getting attributes the clicked image
  var choiceIndex = event.target.getAttribute('index');
  var faceUp = event.target.getAttribute('faceup');
  var faceDown  = event.target.getAttribute('facedown');
  //stops from selecting image after 2 wrong clicks
  if (selecting){
    return;
  };
  //prevents a null image
  if (faceUp === null){
    return;
  };
  countTotal += 1;
  //beginning flip of clicked photo
  event.target.setAttribute('src', faceUp);
  event.target.setAttribute('class', 'flipfront');
  choiceIndexArray.push(choiceIndex);
  //if statements made to determine what will happen upon clicking of photo
  //comparing clicked images
  if (choiceIndexArray[0] !== choiceIndexArray[1]) {
    console.log(choiceIndexArray);
    choiceArray.push(faceUp);
    //comparing if clicked choice is already matched in order to
    //prevent the same correct choices to be clicked again
    if (correctPairs.indexOf(choiceArray[0]) === -1 && correctPairs.indexOf(choiceArray[1]) === -1) {
      //determining the first clicked choice and enabling it to switch
      //back if the second choice is wrong
      if (!firstChoice){
        firstChoice = event.target;
      };
      //script after two choices are made
      if(choiceArray.length === 2){
        //script if choices are MATCHING
        if(choiceArray[0] === choiceArray[1]){
          pushCctPairs();
          //script after all correct choices are made
          if (countCorrect === (imageArray.length / 2)) {
            //timeout to allow seeing the final choice
            setTimeout(finished, 500);
          }
          //what will happen if choices are NOT MATCHING
        } else {
          selecting = true;
          choiceNotMatching(event, faceDown);
        };
      };
    //else if choice has already been matched
    } else {
      alert('Please make another choice.');
      choiceArray = [];
      choiceIndexArray = [];
      firstChoice.setAttribute('src', faceDown);
      firstChoice.setAttribute('class', 'flipback');
      firstChoice = null;
    };
  //else if same card is picked twice
  } else {
    selecting = false;
    setTimeout(function(){flipCards(event, faceDown);}, 0),
    alert('please click a separate card, start over');
    choiceArray = [];
    choiceIndexArray = [];
  };
};

//main

getGameParam();
shuffledArray = shuffleArray(cardDictionary[key1]);
grabItems(shuffledArray, level1);
imageArray = shuffleArray(imageArray);
buildTable(imageArray);
picSelector = document.getElementById('game_table');
picSelector.addEventListener('click', clickHandler);
