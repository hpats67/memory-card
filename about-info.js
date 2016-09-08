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

function distributeObjects() {
  for (var j = 0; j < sortedHighScores.length; j++){
    if (sortedHighScores[j].level === 'easy'){
      sortedHighScoresEasy.push(sortedHighScores[j]);
    } else if (sortedHighScores[j].level === 'medium') {
      sortedHighScoresMed.push(sortedHighScores[j]);
    } else {
      sortedHighScoresHard.push(sortedHighScores[j]);
    };
  };
};

function buildHighScore(array, string) {
  var scoreList = document.getElementById(string);
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
distributeObjects();
buildHighScore(sortedHighScoresEasy, 'high_score_easy');
buildHighScore(sortedHighScoresMed, 'high_score_med');
buildHighScore(sortedHighScoresHard, 'high_score_hard');
