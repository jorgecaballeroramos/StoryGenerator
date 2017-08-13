var totalScore = 0;


function sentimentanalysis(text) {
    //console.log(afinn);
    //Separate in words
    var words = text.split(/\W/);
    //console.log(words);
    var scoredwords = [];
    for (var i = 0; i < words.length; i++) {
        var wordslc = words[i].toLowerCase();
        //console.log('WordsLC: '+ wordslc);

        if (afinn.hasOwnProperty(wordslc)) {
            var score = afinn[wordslc];
            //console.log('Word:'+ wordslc, 'Score:'+ score);
            totalScore += Number(score);
        }
    }
    // console.log('TotalScore:' + totalScore);
    // console.log('Comparative:' + totalScore / words.length)
}
