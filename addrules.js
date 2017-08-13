//Number of sequences
var storyG=["UP","DP","TP","QP","CP","XP","VP","EP","NP","PP","LP","WP"];//Coming from GRAMMAR JSON
var story=[];
var select=Object;



function addRules(nwords){
  if (grammarload){
  console.log('ADD grammar rules');
  //console.log ( nwords.username.length);
  //Add Rule String, string, integer (Probabilities)
  mygrammar.addRule('Country',nwords.country);
  mygrammar.addRule('Age',nwords.numbers[0].toString());
  mygrammar.addRule('Year',nwords.year[0].toString());
  mygrammar.addRule('User',nwords.username[0]);
  console.log(nwords.usergender);
  if(nwords.usergender=="male")
  {
    console.log('MALE');
    var sx="he";
    var pn="his";
  }else{
    console.log('FEMALE');
    var sx="she";
    var pn="her";
  }
  mygrammar.addRule('Sx',sx);
  mygrammar.addRule('Capital', nwords.countrycapitalCity);
  mygrammar.addRule('Job', nwords.userjob);
  mygrammar.addRule('Pn', pn);
  var mentor=["wizard","teacher","guru","friend","shadow","spirit","ghost","coach",
    "warlock","magician","enchanter","witch","genius","expert",
    "maestro","mentor","Gandalf","Princess Leia"];
  var allies=["magician","wizar","model","baby","robot","martian"];
  var enemies=["Monster","Gangster","Evil","Angel","Titan",
    "Creature","Alligator","Ant","Bear","Bee","Bird","Camel","Cat","Cheetah","Chicken","Chimpanzee",
      "Cow","Crocodile","Deer","Dog","Dolphin","Duck","Eagle","Elephant","Fish","Fly","Fox",
      "Frog","Giraffe","Goat","Goldfish","Hippopotamus","Horse","Kangaroo","Kitten",
      "Lion","Lobster","Monkey","Octopus","Owl","Panda","Pig","Puppy","Rabbit","Rat","Scorpion",
      "Seal","Shark","Sheep","Snail","Snake","Spider","Squirrel","Tiger","Turtle","Wolf","Zebra","The Giant","President Trump","Supreme Leader Kim Jong Un","The Priest","Zuckerberg"];
  var placea=["farm","house","apartment","forrest","castle","beach","city","building", "street","factory","camping","church"];
  var placeb=["bar","saloon","street","parking","forrest","jungle","desert","basement","hotel","factory"];
  var placec=["fort","castle","blockhouse","tower","bunker","headquarters","cave"];
  var relatives=["pets","friends","relatives","parents","classmates","family","toys","partners","body","students"];
  var action=["destroy","kill","kidnap","rape","hurt","hate","cheat"];
  var gift1=["wad of bills", "gun", "book","magic potion","sacred stone","sword","light saber","wise advice","red pill"];
  var gift2=["treasure","bomb","toy","weapon","map","book","sword","pill","secret"];
  var animal=["alligator","ant","bear","bee","bird","camel","cat","cheetah","chicken","chimpanzee",
    "cow","crocodile","deer","dog","dolphin","duck","eagle","elephant","fish","fly","fox",
    "frog","giraffe","goat","goldfish","hamster","hippopotamus","horse","kangaroo","kitten",
    "lion","lobster","monkey","octopus","owl","panda","pig","puppy","rabbit","rat","scorpion",
    "seal","shark","sheep","snail","snake","spider","squirrel","tiger","turtle","wolf","zebra"];
  var med=["letter","message","fax","sms","phone call", "call","email"];

  select.mentor=mentor[Math.floor(Math.random()*mentor.length)];
  mygrammar.addRule('Mentor', select.mentor);

  select.allies=allies[Math.floor(Math.random()*allies.length)]
  mygrammar.addRule('Allies', select.allies);

  select.enemies=enemies[Math.floor(Math.random()*enemies.length)]
  mygrammar.addRule('Enemies',select.enemies);

  select.placea=placea[Math.floor(Math.random()*placea.length)];
  mygrammar.addRule('PlaceA',select.placea);

  select.placeb=placeb[Math.floor(Math.random()*placeb.length)];
  mygrammar.addRule('PlaceB',select.placeb);

  select.placec=placec[Math.floor(Math.random()*placec.length)];
  mygrammar.addRule('PlaceC',select.placec);

  select.relatives=relatives[Math.floor(Math.random()*relatives.length)];
  mygrammar.addRule('Relatives',select.relatives);

  select.action=action[Math.floor(Math.random()*action.length)];
  mygrammar.addRule('Action',select.action);

  select.gift1=gift1[Math.floor(Math.random()*gift1.length)];
  mygrammar.addRule('Gift1',select.gift1);

  select.gift2=gift2[Math.floor(Math.random()*gift2.length)];
  mygrammar.addRule('Gift2',select.gift2);

  select.animal=animal[Math.floor(Math.random()*animal.length)];
  mygrammar.addRule('Animal',capitalize(select.animal));

  select.med=med[Math.floor(Math.random()*med.length)];
  mygrammar.addRule('Med',select.med);


  //HATES LIKES
  //mygrammar.addRule('Gift2', gift2[Math.floor(Math.random()*gift2.length)]);
  newstory();

}
else{
  console.log('GRAMMAR NOT LOADED');
}
}

function newstory() {
  for (var j=0;j<storyG.length;j++){
    story[j]=mygrammar.expandFrom(storyG[j]);
  }
  console.log(story);
  //createP(story);
  //playvoice(story);
}
