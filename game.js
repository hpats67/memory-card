'use strict';

var imageArray = ['imgs/alien.jpg', 'imgs/alien.jpg', 'imgs/ghostbuster.jpg', 'imgs/ghostbuster.jpg', 'imgs/darkknight.jpg', 'imgs/darkknight.jpg', 'imgs/rocky.jpg', 'imgs/rocky.jpg', 'imgs/starwars.jpg', 'imgs/starwars.jpg', 'imgs/bladerunner.jpg', 'imgs/bladerunner.jpg'];
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
    }
    table.appendChild(tRow);
  }
}
shuffleArray(imageArray);
buildTable();
// counts correct pairs
var countCorrect = 0;
// counts total clicks
var countTotal = 0;
// selects game table
var picSelector = document.getElementById('game_table');
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
picSelector.addEventListener('click', clickHandler);

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
  choiceIndexArray.push(choiceIndex);
  //function to flip cards and allow for setTimout
  function flipCards() {
    selecting = false;
    event.target.setAttribute('src', faceDown);
    firstChoice.setAttribute('src', faceDown);
    firstChoice = null;
    event.target.disable = false;
  };
  //function to stop selecting already correct Pairs
  console.log('click' + event.target);
  //if statements made to determine what will happen upon clicking of photo
  //comparing clicked images
  if (choiceIndexArray[0] !== choiceIndexArray[1]) {
    choiceArray.push(faceUp);
    //comparing if clicked choice is already matched in order to
    //prevent the same correct choices to be clicked again
    if (correctPairs.indexOf(choiceArray[0]) === -1) {
      //determining the first clicked choice and enabling it to switch
      //back if the second choice is wrong
      if (!firstChoice){
        firstChoice = event.target;
      }
      //script after two choices are made
      if(choiceArray.length === 2){
        console.log('choice.length' + choiceArray);
        //script if choices are MATCHING
        if(choiceArray[0] === choiceArray[1]){
          correctPairs.push(choiceArray[0]);
          choiceArray = [];
          choiceIndexArray = [];
          countCorrect += 1;
          firstChoice = null;
          //script after all correct choices are made
          if (countCorrect === 6) {
            function finished(){
              alert('You got them all!');
              window.location = 'about-info.html';
            }
            //timeout to allow seeing the final choice
            setTimeout(finished, 500);
          }
          console.log(true);
          console.log(choiceArray);
          //what will happen if choices are NOT MATCHING
        } else{
          selecting = true;
          setTimeout(flipCards, 1000);
          clickHandler.disable = true;
          choiceArray = [];
          choiceIndexArray = [];
          console.log(choiceArray);
        }
      }
    //else if choice has already been matched
    }else {
      alert('Please make another choice.');
      choiceArray = [];
    }
  //else if same card is picked twice
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
