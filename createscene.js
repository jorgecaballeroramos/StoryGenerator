//A-Frame
var scene;

//Inititializing seq
var seq=0;

//Current year
var cdate = new Date();
console.log(cdate);
var cyear = cdate.getFullYear();
var cmonth = cdate.getMonth() + 1;
var cday = cdate.getDate();


var firsttime=true;
var btnf=false;
var btnb=false;
//Search tagsx
var wtag;

function LoadcreateVR()
{
  console.log('BTNBACK'+btnb);
  console.log('BTNFWD'+btnf);
  console.log('SEQ'+seq);

  if (seq==0&&firsttime){
  removeID('micbox');
  createText();
  firsttime=false;
  }
  if (seq==0)
  {
    createButtonFVR();

  }

  if (seq==1)
  {
    createButtonBVR();
  }


  createVR(urlEqui[seq]);
  createStory();
  //FreeSoundASK(wtagA[seq]);//Search sounds.
  createArraySounds();
}
//A-Frame creation
function removeID(id){
  var x=document.getElementById(id);
//  console.log(x);
  if(x!=null){
  x.parentNode.removeChild(x);
  }
}




//Function to create A-FRAME with Image from Flickr.
function createVR(urlimg) {
    var scene=document.getElementById('vr');
    var sky=document.getElementById('sky');
    sky.parentNode.removeChild(sky);
    var sky = document.createElement('a-sky');
    sky.setAttribute('id', 'sky');
    sky.setAttribute('src', urlimg);
    var animationIN = document.createElement('a-animation');
    animationIN.setAttribute('attribute', 'material.opacity');
    animationIN.setAttribute('from', 0);
    animationIN.setAttribute('to', 1);
    animationIN.setAttribute('dur', time*1000);
    animationIN.setAttribute('easing', 'ease-in');
    sky.appendChild(animationIN);
    scene.appendChild(sky);
}

function createText(){
  var scene=document.getElementById('vr');
  var entity = document.createElement('a-entity');
  entity.setAttribute('id','planetext');
  entity.setAttribute('position',{ x:0, y:2.5, z:-2});
  entity.setAttribute('geometry','width:2;height:0.6;primitive:plane');
  entity.setAttribute('material','color: #E94E1B; opacity:0');
  var animationIN = document.createElement('a-animation');
  animationIN.setAttribute('attribute', 'material.opacity');
  animationIN.setAttribute('from', 0);
  animationIN.setAttribute('to', 0.6);
  animationIN.setAttribute('dur', (time)*1000);
  animationIN.setAttribute('easing', 'ease-in');
  entity.appendChild(animationIN);
  scene.appendChild(entity);
}

function createStory(){
  var planetext=document.getElementById('planetext');
  planetext.setAttribute('text','value:'+story[seq]+'; width:1.8');
}

function createButtonFVR(){
  btnf=true;
  var scene=document.getElementById('vr');
  var aentityn = document.createElement('a-entity');
  aentityn.setAttribute('id','buttonforward');
  aentityn.setAttribute('geometry','radiusInner:0.01; segmentsTheta:2; segmentsPhi:12; radiusOuter:2; primitive:ring;');
  aentityn.setAttribute('material','color:#E94E1B; opacity:0.7');
  aentityn.setAttribute('position','0.1 2 -2');
  aentityn.setAttribute('scale','0.06 0.06 0.06');
  aentityn.setAttribute('text','align:center; value:+; width:13;color:#FFFFFF');
  aentityn.setAttribute('nextseq','');
  var animationIN = document.createElement('a-animation');
  animationIN.setAttribute('attribute', 'material.opacity');
  animationIN.setAttribute('from', 0);
  animationIN.setAttribute('to', 0.7);
  animationIN.setAttribute('dur', (time)*1000);
  animationIN.setAttribute('easing', 'ease-in');
  aentityn.appendChild(animationIN);
  scene.appendChild(aentityn);
}
function createButtonBVR(){
btnb=true;
var scene=document.getElementById('vr');
var aentityb = document.createElement('a-entity');
aentityb.setAttribute('id','buttonbackward');
aentityb.setAttribute('geometry','radiusInner:0.01; segmentsTheta:2; segmentsPhi:12; radiusOuter:2; primitive:ring;');
aentityb.setAttribute('material','color:#E94E1B; opacity:0.7');
aentityb.setAttribute('rotation','0 0 180');
aentityb.setAttribute('position','-0.1 2 -2');
aentityb.setAttribute('scale','0.06 0.06 0.06');
aentityb.setAttribute('text','align:center; value:-; width:13;color:#FFFFFF');
aentityb.setAttribute('prevseq','');
var animationIN = document.createElement('a-animation');
animationIN.setAttribute('attribute', 'material.opacity');
animationIN.setAttribute('from', 0);
animationIN.setAttribute('to', 0.7);
animationIN.setAttribute('dur', (time)*1000);
animationIN.setAttribute('easing', 'ease-in');
aentityb.appendChild(animationIN);
scene.appendChild(aentityb);
}




//Aray of sounds
function createArraySounds(){
  //Array of URL sounds
  window.ArraySURL = [];
  window.sID=0;
  //Number of audios to use in A-Frame
  window.p=0;//Index of Sound Array
  var ang=0;//Initial angle
  window.ArrayPosAud=new Array(numAud);//Array of x,y,z positions of each sound in the ArraySURL
  for (var i = 0; i < numAud; i++) {
    ArrayPosAud[i] = new Array(3);
  }

  //To distribute the array of sounds around the circle X,Z
  for (var n=0;n<numAud;n++)
  {
    //console.log('ANG='+ang);
    //Convert degrees to rad and round
    var nX=Math.round(r*Math.cos(ang*(Math.PI/180)));
    var nY=0;
    var nZ=Math.round(r*Math.sin(ang* (Math.PI/180)));
    ArrayPosAud[n][0]=nX;
    ArrayPosAud[n][1]=nY;
    ArrayPosAud[n][2]=nZ;
    ang+=(360/numAud);
  }
  console.log(ArrayPosAud);
}

function createSound(id) {
    var sound = document.createElement('a-sound');
    sound.setAttribute('src', id);
    sound.setAttribute('autoplay', 'true');
    sound.setAttribute('loop','true');
    sound.setAttribute('position', { x: ArrayPosAud[p][0], y: ArrayPosAud[p][1], z: ArrayPosAud[p][2] });
    scene.appendChild(sound);
    //console.log ('X='+ArrayPosAud[p][0]+'Y='+ArrayPosAud[p][1]+'Z='+ArrayPosAud[p][2]);
    p++;
}

AFRAME.registerComponent('nextseq', {
    schema: {
    },
    init: function() {
        var data = this.data;
        this.el.addEventListener('click', function() {
            if(seq>=0&&seq<storyG.length-1){
              seq++;
              LoadcreateVR();
            //  console.log('Next. Number of seq='+seq+'Number total de seq:'+storyG.length);
            }
            if (seq==storyG.length-1){
              removeID('buttonforward');
            }
        });
        this.el.addEventListener('mouseleave' , function() {
          if(seq>=0&&seq<storyG.length-1){
          button = document.getElementById("buttonforward");
          button.setAttribute("material", "color:#E94E1B; opacity:0.4");
        }
        });
        this.el.addEventListener('mouseenter', function() {
          if(seq>=0&&seq<storyG.length-1){
          button = document.getElementById("buttonforward");
          button.setAttribute("material", "color:#E94E1B; opacity:1");
        }
        });
    }
});




AFRAME.registerComponent('prevseq', {
    schema: {
    },
    init: function() {
        var data = this.data;
        this.el.addEventListener('click', function() {
          if(seq>=1&&seq<=storyG.length){
            seq--;
            LoadcreateVR();
            console.log('BACK. Number of seq='+seq+'Number total de seq:'+storyG.length);
          }
          if (seq==0){
            removeID('buttonbackward');
          }
        });
        this.el.addEventListener('mouseleave', function() {
          if(seq>=1&&seq<=storyG.length){
          button = document.getElementById("buttonbackward");
          button.setAttribute("material", "color:#E94E1B; opacity:0.4");
        }
        });
        this.el.addEventListener('mouseenter', function() {
          if(seq>=1&&seq<=storyG.length){
          button = document.getElementById("buttonbackward");
          button.setAttribute("material", "color:#E94E1B; opacity:1");
        }
        });
    }
});
