// Penn Part of Speech Tags
// https://cs.nyu.edu/grishman/jet/guide/PennPOS.html
// 	1.	CC	Coordinating conjunction
// 	2.	CD	Cardinal number
// 	3.	DT	Determiner
// 	4.	EX	Existential there
// 	5.	FW	Foreign word
// 	6.	IN	Preposition or subordinating conjunction
// 	7.	JJ	Adjective
// 	8.	JJR	Adjective, comparative
// 	9.	JJS	Adjective, superlative
// 	10.	LS	List item marker
// 	11.	MD	Modal
// 	12.	NN	Noun, singular or mass
// 	13.	NNS	Noun, plural
// 	14.	NNP	Proper noun, singular
// 	15.	NNPS	Proper noun, plural
// 	16.	PDT	Predeterminer
// 	17.	POS	Possessive ending
// 	18.	PRP	Personal pronoun
// 	19.	PRP$	Possessive pronoun
// 	20.	RB	Adverb
// 	21.	RBR	Adverb, comparative
// 	22.	RBS	Adverb, superlative
// 	23.	RP	Particle
// 	24.	SYM	Symbol
// 	25.	TO	to
// 	26.	UH	Interjection
// 	27.	VB	Verb, base form
// 	28.	VBD	Verb, past tense
// 	29.	VBG	Verb, gerund or present participle
// 	30.	VBN	Verb, past participle
// 	31.	VBP	Verb, non-3rd person singular present
// 	32.	VBZ	Verb, 3rd person singular present
// 	33.	WDT	Wh-determiner
// 	34.	WP	Wh-pronoun
// 	35.	WP$	Possessive wh-pronoun
// 	36.	WRB	Wh-adverb

var nwords = new Object();
lexicon = new RiLexicon();
var alertname=false;
var alertage=false;
var alertcountry=false;
var alertnouns=false;
var alertS=" ";

// //RitaLexicon
// //Using Rita Lexicon to split in words and get nouns
nwords.username = [];
nwords.country = 0;
nwords.numbers = [];
nwords.nouns = [];
nwords.year = [];
nwords.verbs = [];
nwords.adj = [];
nwords.adv = [];
nwords.countryiso2code=0;
nwords.countryregion=0;
nwords.countrycapitalCity=0;
nwords.countryincomeLevel=0;
nwords.userjob = 0;
nwords.userjobprobability = 0;
var tempjob='0';
var tempcountry='0';

function textanalysis(text) {
    //console.log('ProcessRita' + new Date());
    //RitaString. Array with all the words.
    var rs = new RiString(text);
    //Array of word
    var words = rs.words();
    //Position of each one
    var pos = rs.pos();
     //console.log(words);
     //console.log(pos);
    for (var i = 0; i < words.length; i++) {
      // var tempC=findelementA(words[i],"country",countriesA);
      // console.log('My Country is: '+countries[1][tempC].name);

        switch (pos[i]) {
            case "nn":
            case "nns":
                if (words[i]!="name"&&words[i]!='work'){
                if (words[i].length>=4){
                tempjob=findelementA(words[i],"job",jobsA);
                tempcountry=findelementA(words[i],"country",countriesA);
                }
                //Singularize
                words[i] = RiTa.singularize(words[i]);
                nwords.nouns.push(words[i]);
                }
                break;
            case "nnp":
            case "nnps":
            case "cd":
                //parseInt returns int or NaN if is not a number
                if (isNaN(parseInt(words[i]))) {
                  if (words[i]!="I'm"){
                  if (words[i].length>=4){
                  tempjob=findelementA(words[i],"job",jobsA);
                  tempcountry=findelementA(words[i],"country",countriesA);
                }
                  //newjob(words[i]);
                  nwords.username.push(words[i]);
                }
                } else {
                    nwords.numbers.push(parseInt(words[i]));
                }
                break;
            case "vb":
            case "vbd":
            case "vbp":
            case "vbz":
                if(words[i].length>=4){
                nwords.verbs.push(words[i]);
              }
                break;
            case "vbg":
                words[i] = words[i].replace(/ing/g, '');
                nwords.verbs.push(words[i]);
                break;
            case "vbn":
                words[i] = words[i].replace(/ing/g, '');
                nwords.verbs.push(words[i]);
                break;
            case "jj":
            case "jjr":
            case "jjs":
                if (words[i].length>=4){
                tempjob=findelementA(words[i],"job",jobsA);
                tempcountry=findelementA(words[i],"country",countriesA);
                }
                nwords.adj.push(words[i]);
                break;
            case "rb":
            case "rbr":
            case "rbs":
                if (words[i].length>=4){
                tempjob=findelementA(words[i],"job",jobsA);
                tempcountry=findelementA(words[i],"country",countriesA);
              }
                nwords.adv.push(words[i]);
                break;
        }
    }
    //Organizing nouns, verbs and adjectives
    nwords.nouns = nwords.nouns.sort();
    nwords.verbs = nwords.verbs.sort();
    nwords.adj = nwords.adj.sort();

    nwords.userjob=newjobs[tempjob].Occupation;
    nwords.userjobprobability=newjobs[tempjob].Probability;
    nwords.country=countries[1][tempcountry].name;
    nwords.countryiso2code=countries[1][tempcountry].iso2Code;
    nwords.countryregion=countries[1][tempcountry].region.value;
    nwords.countrycapitalCity=countries[1][tempcountry].capitalCity;
    nwords.countryincomeLevel=countries[1][tempcountry].incomeLevel.value;
    if(nwords.numbers.length!=0){nwords.year[0]=cyear-nwords.numbers[0];}

    //Removing repetitions
    nwords.nouns = nwords.nouns.filter((v, i, a) => a.indexOf(v) === i);
    nwords.verbs = nwords.verbs.filter((v, i, a) => a.indexOf(v) === i);
    nwords.adj = nwords.adj.filter((v, i, a) => a.indexOf(v) === i);
    nwords.username = nwords.username.filter((v, i, a) => a.indexOf(v) === i);

    var indexA=["I'm",nwords.country];
    for (var i=0;i<indexA.length;i++){
      var index = nwords.username.indexOf(indexA[i]);
      if(index>-1){nwords.username.splice(index, 1);}
    }

    if (nwords.username.length==0)
    {
      var alertname=true;
      alertS+='Your name is missing.\n';
    }
    if (nwords.numbers.length==0)
    {
      var alertage=true;
      alertS+='Your age is missing.\n';
    }
    if (tempcountry==0)
    {
      var alertcountry=true;
      alertS+='Your country is missing.\n';
    }
    if (nwords.nouns.length<=7)
    {
      var alertnouns=true;
      alertS+='Please tell me something else about yourself.\n';
    }

    var alert = document.getElementById('alert');
    if (alertname||alertage||alertcountry||alertnouns)
    {
      alert.setAttribute('position',"3.6 3.7 -15");
      alert.setAttribute('text','font: kelsonsans; anchor: center; width:12; color:#FF0000; wrapCount:50;value:'+alertS);
      console.log(nwords);
    }
    else {
      alert.setAttribute('text','font: kelsonsans; anchor: center; width:12; color:#000000; wrapCount:50;value:Loading story...');
      console.log(nwords);
      getGender();
    }
}




//TO know if the country is one of the countries that I have listed.
function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == obj) return true;
        //console.log(obj);
    }
}
