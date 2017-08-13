var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var really_final_transcript = '';
var final_transcript = '';
var interim_transcript = '';
var recognizing = false;
var continue_recognizing_on_end = false; //On end start again
var ignore_onend=false;
var start_timestamp=0;

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-GB';//England
recognition.maxAlternatives = 1;


recognition.onstart = function() {
  final_transcript = '';
  recognizing = true;
};

recognition.onresult = function(event) {
  console.log('onresult ON');
  interim_transcript = '';
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
      //console.log('Final here:'+final_transcript);
    } else {
      interim_transcript += event.results[i][0].transcript;
      }
  }
  reccircle.setAttribute('material','opacity:1');
  reccircle.setAttribute('color','#FF0000');
  //IF ITS MOBILE??
  atext.setAttribute('text',"font: kelsonsans; wrapCount:30; baseline:top; anchor: center; width: 2; color:#000000; value: -" + really_final_transcript + ' ' + final_transcript + ' ' + interim_transcript);
};

recognition.onend = function() {
  recognizing = false;
  if (ignore_onend&&final_transcript==null) {
    console.log('ignore_onend');
    return;
  }
    //console.log('Final transcript: '+final_transcript);

  really_final_transcript = really_final_transcript.trim() + ' ' + final_transcript.trim();
  console.log('Really final transcript: '+really_final_transcript);
  if (continue_recognizing_on_end) {
	recognition.start();
  } else {
	  if (really_final_transcript.trim().length > 0) {
		//console.log('Text Analysis and sentimental analysis');
		//sentimentanalysis(really_final_transcript);
		textanalysis(really_final_transcript);
	  }
  }
};

recognition.onerror = function(event) {
  if (event.error == 'no-speech'&&final_transcript==null) {
    //recognition.start();
    console.log('info_no_speech');
    ignore_onend = true;
  }
  if (event.error == 'audio-capture') {
    console.log('info_no_microphone');
    ignore_onend = true;
  }
  if (event.error == 'not-allowed') {
    if (event.timeStamp - start_timestamp < 100) {
      console.log('info_blocked');
    } else {
      console.log('info_denied');
    }
    ignore_onend = true;
  }
};

function upgrade() {
  console.log('info_upgrade');
}


AFRAME.registerComponent('speechrecognition', {
    schema: {
    },
    init: function() {
        var data = this.data;
        this.el.addEventListener('mouseenter', function() {
          if (recognizing) {
            recognition.stop();
            return;
          }
		      continue_recognizing_on_end = true;
		       really_final_transcript = '';
          recognition.start();
          ignore_onend = false;
          console.log('SPEAK!!');
          reccircle.setAttribute('material','opacity:1');
          reccircle.setAttribute('color','#00FF00');
          // boxspeak.setAttribute('visible','true');
        });

        this.el.addEventListener('mouseleave', function() {
		    continue_recognizing_on_end = false;
		    recognition.stop();
        alertS="";
        });

    }
});
