function getGender() {
    loadJSON('https://api.genderize.io/?name='+nwords.username[0]+'&format=json', gotDataGender);
}
function gotDataGender(dataGender) {
  if(dataGender.gender!=null){
  nwords.usergender=dataGender.gender;
  }
  else{
  var genderR=["male","female"];
  nwords.usergender=genderR[Math.floor(Math.random()*genderR.length)];
}
addRules(nwords);
LoadFlickrASK();
}
