//Function Archive search
function ArchiveAsk(country,year) {
    var url1 = 'https://archive.org/advancedsearch.php?q=';
    var url2 = '+AND+mediatype:movies+AND+format:h.264+AND+date:'+year+'&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=mediatype&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=callback&save=yes';
    loadJSON(url1 + country + url2, gotDataF, 'jsonp');
}

function gotDataF(data) {
    console.log(data);
    var objects = data.response.docs;
    //Selecting one Random Movie
    if (objects.length != 0) {
        var anyindex = Math.floor(random(objects.length));
        var anymov = objects[anyindex].identifier;
        //console.log('TOTAL ELEMENTS: ' + objects.length + 'INDEX: ' + anyindex + 'MOVIE: ' + anymov);
        ArchiveVideoAsk(anymov);
    } else {
        console.log('NO VIDEO');
        novideo=true;
        FirstTime=false;
        ArchiveAsk();
    }
}

//JSON to Archive to play Movie
function ArchiveVideoAsk(identifier) {
    //console.log('id: '+identifier);
    var urlV = 'http://archive.org/details/' + identifier + '&output=json';
    loadJSON(urlV, gotDataV, 'jsonp');
}



function gotDataV(data) {
    //console.log(data);
    var filesA = Object.keys(data.files);
    //console.log('NUMFILES: ' + filesA.length);
    for (var z = 0; z < filesA.length; z++) {
        if (data.files[filesA[z]].format == 'h.264' || data.files[filesA[z]].format == 'MPEG4' || data.files[filesA[z]].format == '512Kb MPEG4' || data.files[filesA[z]].format == 'h.264 HD') {
            //console.log(filesA[z]);
            wVideo = 'http://' + data.server + data.dir + filesA[z];
            z = filesA.length;
            console.log('Video:' + wVideo);
            NYTAsk();
        }
    }
}
