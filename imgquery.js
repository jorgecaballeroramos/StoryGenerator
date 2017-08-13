var idEqui;
var urlEqui=[];
var indeximgsEqui=0;
var indexwtagA=0;
var wtagA=[];
var equi = false;

//var storyG.length;
function LoadFlickrASK(){
var wnouns=[];
var divnouns=4;

for (var j=0;j<divnouns;j++)
{
  wnouns[j]='';
  for (var n=j*Math.round(nwords.nouns.length/divnouns); n<(j+1)*Math.round(nwords.nouns.length/divnouns); n++)
  {
  if(nwords.nouns[n]!=null){
  wnouns[j]+=nwords.nouns[n]+'%20OR%20';
  }
  }
}

// wtagA=[nwords.country,
//   nwords.countrycapitalCity+'%20OR%20'+select.enemies,
//   wnouns[1],
//   select.mentor+'%20OR%20'+select.gift1,
//   select.enemies+'%20OR%20'+select.relatives,
//   select.placeb+'%20OR%20'+select.allies,
//   select.placec,
//   wnouns[2],
//   select.gift2,
//   nwords.userjob+'%20OR%20'+wnouns[3],
//   select.enemies+'%20OR%20'+select.gift2,
//   nwords.country];

  wtagA=[select.placea,//1
    select.enemies,//2
    wnouns[1],//3
    select.gift1+'%20OR%20'+select.mentor,//4
    select.enemies,//5
    select.allies,//6
    select.placec,//7
    wnouns[2],//8
    select.gift2,//9
    wnouns[3],//10
    select.enemies,//11
    nwords.country];//12

//console.log(wtagA);
FlickrASK(wtagA[indexwtagA]);
}


//TOKENS
var tokenflickr = '70970bed5b4abffd27b326b934fee1eb';//Flickr Token
//FLICKR CALL
function FlickrASK(wtag) {
    //console.log('Calling Flickr:' + wtag);
    var ppage = 350;
    var textq = 'equirectangular';
    // var url1 = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
    // //var url2 = '&dimension_search_mode=min&height=1024&width=1024&content_type=1&text='
    // var url2 = '&dimension_search_mode=min&height=1024&width=1024&content_type=1'
    // var url3 = '&media=photos&tag_mode=any&format=json&nojsoncallback=1';
    // loadJSON(url1 + tokenflickr + '&query=' + wtag + '&per_page=' + ppage + url2 + url3, gotDataFlickr);
    // loadJSON(url1 + tokenflickr + '&query=' + wtag + '&per_page=' + ppage + url2 + textq + url3, gotDataFlickr);

    var url1 = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
    var url2 = '&per_page=350&group_id=44671723%40N00&view_all=1&text='
    var url3 = '&media=photos&tag_mode=any&format=json&nojsoncallback=1';
    loadJSON(url1 + tokenflickr + url2 + wtag + url3, gotDataFlickr);
    // //loadJSON(url1 + tokenflickr + '&tags=' + wtag + '&per_page=' + ppage + url2 + url3, gotDataFlickr);
    // console.log(url1 + tokenflickr + url2 + wtag + url3);
}

function gotDataFlickr(dataFLickr) {
    //Lenght Flickr Results Per Page
    var photos = dataFLickr.photos;
    var photos_length = photos.photo.length;
    //console.log(photos_length);
    if (photos_length!= 0){
      var anyphoto = Math.floor(Math.random()*photos_length);
      //console.log('Photo number:'+anyphoto);
      idEqui=photos.photo[anyphoto].id;
      FlickrASKSize(idEqui);
      //console.log('Call flicr size');
    } else {
      //console.log('NO IMAGES DO SOMETHING!!!');//If no images call again.
      FlickrASK(" ");
    }
  }

function FlickrASKSize(id) {
    //console.log('FlickrAskSize');
    var url1 = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=';
    var url2 = '&format=json&nojsoncallback=1';
    loadJSON(url1 + tokenflickr + '&photo_id=' + id + url2, gotDataSize);
    //console.log(url1 + tokenflickr + '&photo_id=' + id + url2);
}

function gotDataSize(data) {
    //console.log('EQUI1:'+equi);
    var arrSize = data.sizes.size;
    var lengthSize = arrSize.length - 1;
    var maxW = 4000;//Max img width
    //console.log(data);
    for (var j = lengthSize; j > 1; j--) {
      //if (arrSize[j].width <= maxW && arrSize[j].width / arrSize[j].height == 2)
      if (arrSize[j].width <= maxW)
        {
          //console.log('Is equi and big enough! VAR j:'+ j);
          var urlimg = arrSize[j].source;
          //console.log('New URL:' + urlimg);
          equi = true;
          j=0;
        } else {
          //console.log('IS NOT EQUIRECTANGULAR');
          equi = false;
          }
        }
    if (equi){
      //console.log('New URL:' + urlimg);
      urlEqui.push(urlimg);
      indexwtagA++;
      //console.log('Index: '+indexwtagA+' Length: '+storyG.length);
      if(indexwtagA<storyG.length){
      FlickrASK(wtagA[indexwtagA]);
      }
    }
    else{
      //console.log('BAD');
      FlickrASK("");
    }

    //If I have the length elements print
    if (indexwtagA==storyG.length){
      //console.log(urlEqui);
    }
    //If there is at least one element in URL Array
    if (urlEqui.length==1){
    LoadcreateVR();
    }
}
