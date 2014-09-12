$(document).ready(function(){
$('#slide').cycle({ 
    fx:    'curtainX', 
    sync:  false, 
    delay: -20000 
 });
 $('.title li:first').fadeIn("15000").animate({fontSize:"3.5em"},'15000',"easeInCirc");
});

function slideShow() {
  var current = $('#photos .show');
  var next = current.next().length ? current.next() : current.siblings().first();
  
  current.hide().removeClass('show');
  next.fadeIn().addClass('show');
  
  setTimeout(slideShow, 3000);
}
