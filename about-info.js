'use strict';

var highScores;
var sortedHighScores;

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

function buildHighScore(array) {
  var scoreList = document.getElementById('high_score');
  var li;
  var loopVariable = array.length < 5 ? array.length : 5;
  for (var i = 0; i < loopVariable; i++) {
    li = document.createElement('li');
    li.textContent = array[i].name + ' ' + array[i].score;
    scoreList.appendChild(li);
  };
};

//main

highScores = getScores();
sortedHighScores = objectSort(highScores);
buildHighScore(sortedHighScores);
