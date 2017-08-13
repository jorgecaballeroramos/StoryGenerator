

//DIV
function start() {
  var divintro = document.getElementById( 'intro' );
  divintro.parentNode.removeChild(divintro);
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
	var initial_recognition = new SpeechRecognition();
	initial_recognition.start();
	initial_recognition.abort();
}




//Questions Same Number of Acts
var wquestions=["-What's your name?\n-How old are you?\n-In which country you were born?\n-Tell me something about yourself.\nWhat's your area of occupation?\nWhat do you love or hate...\nWhatever you want, don't be shy.\n\nOnce you are done, turn around.",
"-What do you think about XYZ",
"-What about XYZ..."];


var questions = document.getElementById('questions');
questions.setAttribute('text',"font: kelsonsans; wrapCount:60; anchor: center; width: 4; color:#000000; value:"+ wquestions[0]);

var atext = document.getElementById('atext');
var reccircle = document.getElementById('reccircle');
// var boxspeak=document.getElementById('speak');
