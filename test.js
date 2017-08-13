imgs=["AdobeStock_45855551_Preview.jpeg",
"AdobeStock_62257180_Preview.jpeg",
"AdobeStock_68967657_Preview.jpeg",
"AdobeStock_118797757_Preview.jpeg",
"AdobeStock_123450125_Preview.jpeg",
"AdobeStock_123701923_Preview.jpeg",
"AdobeStock_128484575_Preview.jpeg",
"AdobeStock_128630327_Preview.jpeg",
"AdobeStock_136275532_Preview.jpeg",
"AdobeStock_138164983_Preview.jpeg",
"AdobeStock_140903704_Preview.jpeg",
"AdobeStock_155297116_Preview.jpeg",
"AdobeStock_158889284_Preview.jpeg"
]

ind=0;
createVR();

//Function to create A-FRAME with Image from Flickr.
function createVR() {
    sky = document.getElementById("sky");
    sky.setAttribute("src", '360/'+imgs[ind]);
    if (ind<imgs.length){
    //setTimeout(createVR, 90*1000);//Every X seconds call the function again.
      //console.log('Number of seq='+seq+'Number total de seq:'+storyG.length);
    }
      ind++;

}
