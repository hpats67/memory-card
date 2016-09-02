'use strict';

var imageArray = ['dog', 'dog', 'cat', 'cat'];
var altImage;

function shuffleArray(array){
  for (var i = imageArray.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
var check = shuffleArray(imageArray);
console.log(check);
