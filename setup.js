//Time to call function again
var time=3;
//Number of acts
var acts=3;

//Jobs Size & Jobs New Array
var sizeJ;
var jobsA;

//Countries Size Array & Countries New Array
var sizeC;
var countriesA;

//Load grammar
var grammarload=false;

//Default
var afinn;

//Loading a Text with all the countries around the world from Wikipedia List.
function preload() {
    afinn = loadJSON('afinn/afinn111.json');
    newjobs=loadJSON('grammar/The-Future-of-Employment.json');
    countries=loadJSON('grammar/countries.json');
    //GetLocation of current user's IP
    getLocation();
}

function setup()
{
  //console.log('Loading grammar...');
  noCanvas();
  mygrammar =new RiGrammar();
  //Load and Callback
  mygrammar.loadFrom('grammar/grammar.json',grammarReady);
  //New Jobs
  //Initialize jobs Array and filling with 0
  sizeJ = Object.keys(newjobs).length;
  jobsA=new Array(sizeJ);
  jobsA.fill(0);
  sizeC = Object.keys(countries[1]).length;
  countriesA=new Array(sizeC);
  countriesA.fill(0);

}

function grammarReady()
  {
    console.log('Grammar ready');
    grammarload=true;
    textanalysis("My name is Anna I'm from Spain I'm 39 years old. I'm working as a film maker. I like cooking and some animals like cows and dolphins and I play violin. I don't like swimming.");

  }
