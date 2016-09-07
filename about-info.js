'use strict';

var highScores;
var sortedHighScores;
var sortedHighScoresEasy = [];
var sortedHighScoresMed = [];
var sortedHighScoresHard = [];

function getScores() {
  var arrayString;
  arrayString = localStorage.getItem('high_score_array');
  return JSON.parse(arrayString);
};

function objectSort(array) {
  var sorted;
  sorted = array.sort(function(a, b) {
    return a.score - b.score;
  });
  return sorted;
};

highScores = getScores();
sortedHighScores = objectSort(highScores);

for (var j = 0; j < sortedHighScores.length; j++){
  if (sortedHighScores[j].level === 'easy'){
    sortedHighScoresEasy.push(sortedHighScores[j]);
  }
}
for (var k = 0; k < sortedHighScores.length; k++){
  if (sortedHighScores[k].level === 'medium'){
    sortedHighScoresMed.push(sortedHighScores[k]);
  }
}
for (var l = 0; l < sortedHighScores.length; l++){
  if (sortedHighScores[l].level === 'medium'){
    sortedHighScoresHard.push(sortedHighScores[l]);
  }
}
buildHighScore(sortedHighScoresEasy);
buildHighScore1(sortedHighScoresMed);
buildHighScore2(sortedHighScoresHard);

function buildHighScore(array) {
  var scoreList = document.getElementById('high_score_easy');
  var li;
  var loopVariable = array.length < 5 ? array.length : 5;
  for (var i = 0; i < loopVariable; i++) {
    li = document.createElement('li');
    li.textContent = array[i].name + ' ' + array[i].score;
    scoreList.appendChild(li);
  };
};
function buildHighScore1(array) {
  var scoreList = document.getElementById('high_score_med');
  var li;
  var loopVariable = array.length < 5 ? array.length : 5;
  for (var i = 0; i < loopVariable; i++) {
    li = document.createElement('li');
    li.textContent = array[i].name + ' ' + array[i].score;
    scoreList.appendChild(li);
  };
};
function buildHighScore2(array) {
  var scoreList = document.getElementById('high_score_hard');
  var li;
  var loopVariable = array.length < 5 ? array.length : 5;
  for (var i = 0; i < loopVariable; i++) {
    li = document.createElement('li');
    li.textContent = array[i].name + ' ' + array[i].score;
    scoreList.appendChild(li);
  };
};
//main
