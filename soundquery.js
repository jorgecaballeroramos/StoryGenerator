//Audios
var numAud = 4;//Number of audios to use in A-Frame
var r=8;//Distance from center

//FREESOUND CALL
//Get the sounds from free sound.
// Search criteria:
//MP3, duration from 5 to 10 sec.
//Array of positions
var tokenfreesound = '5SgatR0E9B0sbTeXmqGrM4QhVlgi9y9aXacQCBxd';//Freesound Token

function FreeSoundASK(wtag) {
    //console.log('AUDIO:' + wtag);
    var url1 = 'https://www.freesound.org/apiv2/search/text/?query=';
    var url2 = '&filter=type:(mp3%20OR%20wav)%20duration:[20%20TO%2090]';//Audios from 5 to 30
    //My personal Token for free sound.
    var url3 = '&format=json&nojsoncallback=1';

    loadJSON(url1 + wtag + url2 + '&token=' + tokenfreesound + url3, gotDataFS);
    //console.log(url1 + wtag + url2 + '&token=' + tokenfreesound + url3);
}

function gotDataFS(data) {
    //console.log(data);
    //var totalmax = data.count;
    var results = data.results;
    //console.log('TOTAL:' + results.length);

    //If there is no audio in freesound call the function again.
    if (results.length > 0) {
        if (numAud > results.length) {
            numAud = results.length;
        }
        //Array of random values. No repating numbers.
        var audioPosA = [];
        while (audioPosA.length < numAud) {
            var posRandomAudio = Math.ceil(Math.random() * results.length-1);
            var newpos = false;
            for (var i = 0; i < audioPosA.length; i++) {
                if (audioPosA[i] == posRandomAudio) {
                    newpos = true;
                    break;
                }
            }
            if (!newpos) {
                audioPosA[audioPosA.length] = posRandomAudio;
            }
        }
        //console.log("RANDOM NUMBERS:" + audioPosA);
        //Create an array with all the different positional sounds.
        for (var j = 0; j < numAud; j++) {
            var id = results[audioPosA[j]].id;
            //console.log(id);
            FreeSoundASKID(id);
        }
    } else {
        FreeSoundASK();
    }
}

//To get the freesound previews in MP3
function FreeSoundASKID(id) {
  var url1 = 'https://www.freesound.org/apiv2/sounds/';
  loadJSON(url1 +id+'/?token=' + tokenfreesound, gotDataFSID);
}

function gotDataFSID(data) {
  //console.log(data);
  var hq="preview-hq-mp3";
  var hqmp3 = data.previews["preview-hq-mp3"];
  createArraySounds();//Number of audios and position of each.
  createSound(hqmp3);
  ArraySURL[sID] = hqmp3;
  sID++;
  //console.log(ArraySURL);
}
