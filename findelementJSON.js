function capitalize(s){
  return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};
function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }
  var max = arr[0];
  var maxIndex = 0;
  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  // nwords.userjob=newjobs[maxIndex].Occupation;
  // nwords.userjobp=newjobs[maxIndex].Probability;
  // console.log(maxIndex);
  // console.log(countries[1][maxIndex].name);
  // console.log(countriesA);

  return maxIndex;
}

function findelementA(welem,wstr,warray){
//console.log(welem);
for (var j=0;j<warray.length-1;j++){
  if (wstr=='job'){var str=newjobs[j].Occupation;
    //console.log(newjobs[j].Occupation);
  }
  if (wstr=='country'){var str=countries[1][j].name;
    //console.log(countries[1][j].name);
  }
  //console.log(welem);
  var C_welem=capitalize(welem);
  //console.log(C_welem);
  if(str.includes(C_welem)){
  warray[j]+=1;
  //console.log(warray[j]);
}
}
  var maxElem=indexOfMax(warray);
  //console.log(warray);
  return maxElem;

}
