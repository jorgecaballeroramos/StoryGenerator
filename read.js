function playvoice(story){
  if(responsiveVoice.voiceSupport()) {
  //console.log ('TRUE');
  responsiveVoice.speak(story, "UK English Female", {rate: 0.9,onstart: StartCallback, onend: EndCallback});
  }
  var voicelist = responsiveVoice.getVoices();
  //console.log(voicelist);
}

function StartCallback(){

}

function EndCallback(){

}
