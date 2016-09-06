'use strict';

var imageArray = ['imgs/dog.gif', 'imgs/cat.jpg', 'imgs/dog.gif', 'imgs/cat.jpg'];
var altImage = 'imgs/back.png';

function shuffleArray(array){
  for (var i = imageArray.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function buildTable(){
  var iA = 0;
  var table = document.getElementById('game_table');
  var tRow;
  var tData;
  var image;
  for (var r = 0; r < 2; r++){
    tRow = document.createElement('tr');
    for (var c = 0; c < 2; c++){
      tData = document.createElement('td');
      image = document.createElement('img');
      image.setAttribute('faceup', imageArray[iA]);
      image.setAttribute('facedown', altImage);
      image.setAttribute('src', altImage);
      image.setAttribute('index', iA);
      iA += 1;
      tData.appendChild(image);
      tRow.appendChild(tData);
    }
    table.appendChild(tRow);
  }
}
shuffleArray(imageArray);
buildTable();

var countCorrect = 0;
var countTotal = 0;
var picSelector = document.getElementById('game_table');
var choiceArray = [];
var choiceIndexArray = [];
var correctPairs = [];
var firstChoice = null;
picSelector.addEventListener('click', clickHandler);

function clickHandler(event){
  var choiceIndex = event.target.getAttribute('index');
  var faceUp = event.target.getAttribute('faceup');
  var faceDown  = event.target.getAttribute('facedown');
  countTotal += 1;
  event.target.setAttribute('src', faceUp);
  choiceIndexArray.push(choiceIndex);

  if (choiceIndexArray[0] !== choiceIndexArray[1]) {
    choiceArray.push(faceUp);
    if (correctPairs.indexOf(choiceArray[0]) === -1) {
      if (!firstChoice){
        firstChoice = event.target;
      }
      if(choiceArray.length === 2){
        console.log(choiceArray);
        if(choiceArray[0] === choiceArray[1]){
          correctPairs.push(choiceArray[0]);
          choiceArray = [];
          choiceIndexArray = [];
          countCorrect += 1;
          firstChoice = null;
          if (countCorrect === 2) {

            var curPlayerScore = updatePlayerInfo(countTotal);
            pullPushHighScoreArray(curPlayerScore);

            alert('You got them all!');
            window.location = 'about-info.html';
          }
          console.log(true);
          console.log(choiceArray);
        } else{
          function flipCards() {
            event.target.setAttribute('src', faceDown);
            firstChoice.setAttribute('src', faceDown);
            firstChoice = null;
          };
          setTimeout(flipCards, 1000),
          choiceArray = [];
          choiceIndexArray = [];
          console.log(choiceArray);
        }
      }
    }else {
      choiceArray = [];
    }
  }else {
    setTimeout(flipCards, 0),
    alert('please click a separate card, start over');
    choiceArray = [];
    choiceIndexArray = [];
  }
  console.log(countCorrect + 'correct count');
  console.log(countTotal + 'total count');
}

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
