
import $ from 'jquery'; 
$(document).ready(function() {
var generateStars = function() {

    var $galaxy = $(".galaxy");
    var iterator = 0;
  
    while (iterator <= 100) {
      var xposition = Math.random();
      var yposition = Math.random();
      var star_type = Math.floor((Math.random() * 3) + 1);
      var position = {
        "x": $galaxy.width() * xposition,
        "y": $galaxy.height() * yposition,
      };
  
      $('<div class="star star-type' + star_type + '"></div>').appendTo($galaxy).css({
        "top": position.y,
        "left": position.x
      });
  
      iterator++;
    }
  
  };
  
  generateStars();
});