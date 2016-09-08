'use strict';

var formInput;

function PlayerInfo(name, email, level, cardset) {
  this.name = name;
  this.email = email;
  this.level = level;
  this.cardset = cardset;
  this.score = 0;
};

function storeData(key, object) {
  var jsonString  = JSON.stringify(object);
  localStorage.setItem(key, jsonString);
};

function submitData(event) {
  event.preventDefault();
  var name = event.target.name.value.trim();
  var email = event.target.email.value.trim();
  var level = event.target.level.value.trim();
  var cardset = event.target.cardset.value.trim();
  var player = new PlayerInfo(name, email, level, cardset);

  storeData('current_player', player);

  event.target.name.value = null;
  event.target.email.value = null;
  event.target.level.value = null;

  window.location = 'game.html';
};

//main

formInput = document.getElementById('front_form');
formInput.addEventListener('submit', submitData, false);
