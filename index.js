var sw = 800,sh = 500;
var images = [];
cnt = [];
EMOTIONS = ['Happy','Anger','Fear','Sad','Disgust','Wonder'];
var draw2;
var element,x,y;
var db = [['0,0 60,00 60,30 0,30 0,0'],
['50,0 80,50 20,50 50,00'],
['0,30 30,0 60,30 60,60 0,60 0,30'],
['0,20 30,0 60,20 60,40 30,60 0,40 0,20'],
['0,0 50,0 50,2 0,2 0,0'],
['M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80'],
["M10 80 Q 95 10 180 80"],
["m -40 -80 l  80 -80 l 120 -10 l  -80 50 l 40 50  l  80 50 l -80 50  l  80 50 l -80 50"],
["m 0 0 l 10 70 l 80 20 l 20 80 "],
];
var selectedColor = '#ffff00';
var elem = [];
var selectStatus = false;
var shape;
var activeShape;
var config = {
  apiKey: "AIzaSyB0VrJTiEhGFYhoM3LO-XP6NjEIw8JgCfY",
  authDomain: "viscom-98b9f.firebaseapp.com",
  databaseURL: "https://viscom-98b9f.firebaseio.com",
  projectId: "viscom-98b9f",
  storageBucket: "viscom-98b9f.appspot.com",
  messagingSenderId: "290260144183"
};
firebase.initializeApp(config);
var firestore = firebase.firestore();
const docRef = firestore.collection("gallery");


(function(){
  draw2 = SVG('drawboard').size(sw,sh);
  draw2.addClass('samples');
  window.onkeypress = function(event){
    if(activeShape){
      if(event.key == "Delete"){
        activeShape.kill();
        cnt.splice(cnt.indexOf(activeShape.shape()),1);
      }
      if(event.key == "x" || event.key == "X")
        document.getElementById("skewx").checked = !document.getElementById("skewx").checked;
      if(event.key == "y" || event.key == "Y")
        document.getElementById("skewy").checked = !document.getElementById("skewy").checked;
      if(event.key == "r" || event.key == "R")
        document.getElementById("rotate").checked = !document.getElementById("rotate").checked;
    }
  }
  colorBoard();
  shape_display();

  setup();
alert("Please Zoom out a little if your using windows for better resolution. ctrl + 'minus' to zoom out 75% generally works");
})()

function setup(){
  var em = document.getElementsByClassName("emotions")[0];
  em.innerHTML = 'Emotions: '+EMOTIONS[images.length];
  var rect2 = draw2.polyline('0,0 '+sw+',0 '+sw+','+sh+' 0,'+sh).fill('#fff');
  rect2.addClass('whiteCanvas');
  element = document.getElementById('drawboard');
  position = element.getBoundingClientRect();
  x = position.left;
  y = position.top;
  document.getElementById("skewx").checked = true;
  document.getElementById("skewy").checked = true;
  // document.getElementsByClassName("slider")[0].addEventListener("mousedown",function(){
  //   document.getElementsByClassName("slider")[0].addEventListener("mousemove",changeColor);
  // });
  // document.getElementsByClassName("slider")[1].addEventListener("mousedown",function(){
  //   document.getElementsByClassName("slider")[1].addEventListener("mousemove",changeColor);
  // });
  // document.getElementsByClassName("slider")[2].addEventListener("mousedown",function(){
  //   document.getElementsByClassName("slider")[2].addEventListener("mousemove",changeColor);
  // });
  // document.getElementsByClassName("slider")[0].addEventListener("change",changeColor);
  // document.getElementsByClassName("slider")[1].addEventListener("change",changeColor);
  // document.getElementsByClassName("slider")[2].addEventListener("change",changeColor);

}

window.onresize = function(){
  element = document.getElementById('drawboard');
  position = element.getBoundingClientRect();
  x = position.left;
  y = position.top;
  console.log(x);
  console.log(y);
  
};

function changeColor(){
  var Hue = document.getElementById('Hue');
  var Saturation = document.getElementById('Saturation');
  var Lightness = document.getElementById('Lightness');
  var picker = document.getElementsByClassName('pickerHSL')[0];
  picker.style.backgroundColor = "hsl("+Hue.value.toString()+","+Saturation.value.toString()+"%,"+Lightness.value.toString()+"%)";
}
function shape_display(){
  i=0;
  var figBoard = [];
  var shapeBoard = document.getElementById('shelves');
  figBoard.push(document.createElement('div'));
  figBoard[i].id = db.length.toString();
  shapeBoard.appendChild(figBoard[i]);
  figsvg = SVG(db.length.toString()).size(100,100).id(db.length);
  var fig = figsvg.ellipse(60 ,60).id(db.length);
  fig.fill('none').move(20, 20);
  fig.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' });
  figBoard[0].onclick = function(event){
    shape = event.target.id;
    selectStatus = true;
    painting(event);
  }

  for(i=0;i<db.length;i++){
    figBoard.push(document.createElement('div'));
    figBoard[i+1].id = i.toString();
    figBoard[i+1].onclick = function(event){
      shape = event.target.id;
      selectStatus = true;
      painting(event);
    }
    shapeBoard.appendChild(figBoard[i+1]);
    figsvg = SVG(i.toString()).size(100,100).id(i);
    console.log(db[0]);
    if(i<5){
      var fig = figsvg.polyline(db[i][0]).id(i);
      fig.fill('none').move(20, 20);
      fig.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' });
    }else {
      var fig = figsvg.path(db[i][0]).id(i).transform({ scaleX : 0.3 ,scaleY: 0.3});
      fig.fill('none').move(-60, -50);
      fig.stroke({ color: '#f06', width: 10});
    }
  }
}
function colorBoard(){
    a = ['#000000','#4d4d4d','#662200','#6b6b47','#507d2a','#a50000',' #ff0000','#191970','#ffff00','#33cc33','#3399ff',' #b3d9ff'];
    b = document.getElementsByClassName('clselector')[0];
    l = b.getElementsByTagName('li');
    for(i=0;i<a.length;i++){
      l[i].id = a[i];
      l[i].style.backgroundColor = a[i];
      l[i].onclick = function(event){
        selectedColor = event.target.id;
      }
    }
}
var fig;
function painting(event){
  if(selectStatus){
    activeShape = new shapes(shape,event);
    cnt.push(shape);
  }
//  fig = draw2.ellipse(60 ,60).stroke({ color: '#f06', width: 10}).fill("#fff");
}
function paintmovie(event){
  if(selectStatus)
    activeShape.Move(event);
  if(activeShape){
    if(activeShape.state == 2){
      activeShape.Move(event);
    }}
}
function ractivate(i){
  //elem[i].state = 2;
  activeShape = elem[i];
}
function NextPage(){
  var np = document.getElementById("NexT");
  var ig = draw2.svg();
  // document.getElementById("gallery").innerHTML += ig;
  images.push(ig);
  elem = [];
  if(images.length == EMOTIONS.length-1){
    np.innrHTML = "Finish";
    np.setAttribute('onclick',"Finish()");
    // np.setAttribute('type',"submit");
  }
  console.log(elem);
  setup();
  var em = document.getElementsByClassName("emotions")[0];
  em.innerHTML = 'Emotions: '+EMOTIONS[images.length] +" "+(images.length+1).toString()+"/6";
}
  draw2.on('click',function(){
  if(selectStatus == true){
    selectStatus = false;
  }
  if(activeShape){
    if(activeShape.state == 1){
      activeShape.state = 2;
    }else {
      activeShape.state = 1;
    }
  }
})

function Finish(){
  var ig = draw2.svg();
  images.push(ig);
  // alert("Finished");
  docRef.add({
    imgDB : images,
    statCount : cnt
  }).then(function(){
    window.location.href = "gallery.html";
  }).catch(function(){
    alert("error");
    console.log("got an error: ");
  });
}
