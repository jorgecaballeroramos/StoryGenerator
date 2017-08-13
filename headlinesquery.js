var HlArtNYT=[];
var ynyt=0;
var nofound=false;
var articlewords = new Object();
articlewords.nouns=[];
articlewords.adj=[];
articlewords.adv=[];
for (var aw=0;aw<acts;aw++){
articlewords.nouns[aw]=[];
articlewords.adj[aw]=[];
articlewords.adv[aw]=[];
//  articlewords.nouns[aw].push('Test'+aw);
}
//console.log(articlewords);

//JSON NYT ASKING ARTICLES TO NEWYORK TIMES
function NYTAsk() {
    var url1 = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
    // var url1 = "https://api.nytimes.com/svc/topstories/v2/home.json?q=";
    //My personal API Keys: Jorge Caballero
    var url2 = '&begin_date='+nwords.year[ynyt]+'0101&end_date='+nwords.year[ynyt]+'1231&type=article&offset=0&api-key=26ca98eb3f8c43ecad43cdf027afee77';
    if(nofound){var searchcriteria=nwords.countryregion;}
    else{searchcriteria=nwords.country}
    loadJSON(url1 + searchcriteria + url2, gotDataArt);
    //console.log(url1 + nwords.country + url2);
}

function gotDataArt(dataArt) {
    //console.log(dataArt);
    var articles = dataArt.response.docs;
    if (articles.length != 0) {
        var IndexArt = Math.floor(random(articles.length));
        //HlArtNYT = articles[IndexArt].headline.main + ". "+articles[IndexArt].snippet;
        HlArtNYT[ynyt]= articles[IndexArt].headline.main;
        HlArtNYT[ynyt]=HlArtNYT[ynyt].replace(/;/g, ",")
        //console.log('Art'+ynyt+'of'+nwords.year[ynyt]+': '+HlArtNYT[ynyt]);
        //addRules(nwords);
        var rsa = new RiString(HlArtNYT[ynyt].toLowerCase());
        //Array of word
        var wordsa = rsa.words();
        //console.log(wordsa);

        //Position of each one
        var posa = rsa.pos();
        //console.log(posa);
        for (var i = 0; i < wordsa.length; i++) {
            switch (posa[i]) {
                case "nn":
                    articlewords.nouns[ynyt].push(wordsa[i]);
                    break;
                case "nns":
                    //Singularize
                    wordsa[i] = RiTa.singularize(wordsa[i]);
                    articlewords.nouns[ynyt].push(wordsa[i]);
                    //articlewords.nouns[aw].push('Test'+aw);
                    break;
                case "jj":
                case "jjr":
                case "jjs":
                    articlewords.adj[ynyt].push(wordsa[i]);
                    break;
                case "rb":
                case "rbr":
                case "rbs":
                    articlewords.adv[ynyt].push(wordsa[i]);
                    break;
            }
        }
        //Organizing nouns, verbs and adjectives
        articlewords.nouns[ynyt] = articlewords.nouns[ynyt].sort();
        ynyt++;
        if(ynyt<acts){
        //FlickrASK();
        setTimeout(NYTAsk,700);
        }
    }
    else {
      //console.log('Sarching by REGION');
        nofound=true;
        ynyt++;
        if(ynyt<acts){
        //console.log('NYT x REGION'+ynyt);
        nofound=true;
        setTimeout(NYTAsk,700);
      }
    }
    if(ynyt==acts){
    console.log(nwords);
    console.log(HlArtNYT);
    console.log(articlewords);
    addRules(nwords);
    LoadFlickrASK();
    }
}
