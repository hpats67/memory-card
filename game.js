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
      image.setAttribute('src', imageArray[iA]);
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
picSelector.addEventListener('click', clickHandler);

function clickHandler(event){
  var choice = event.target.getAttribute('src');
  var choiceIndex = event.target.getAttribute('index');
  countTotal += 1;
  choiceIndexArray.push(choiceIndex);
  if (choiceIndexArray[0] !== choiceIndexArray[1]) {
    choiceArray.push(choice);
    if(choiceArray.length === 2){
      console.log(choiceArray);
      if(choiceArray[0] === choiceArray[1]){
        choiceArray = [];
        choiceIndexArray = [];
        countCorrect += 1;
        console.log(true);
        console.log(choiceArray);
      } else{
        choiceArray = [];
        choiceIndexArray = [];
        console.log(choiceArray);
      }
    }
  }else {
    alert('please click a separate card, start over');
    choiceArray = [];
    choiceIndexArray = [];
  }
  console.log(countCorrect + 'correct count');
  console.log(countTotal + 'total count');
}
