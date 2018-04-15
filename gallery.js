EMOTIONS = ['Happy','Anger','Fear','Sad','Disgust','Wonder'];
EMOTIONSCOLOR = ['#5afc5d','#ff3a3a','#302d2b','#604e2e','#af4f23','#70d8ff'];

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
// var OL = document.querySelector("#galleryList");
const board = document.getElementById("ShowBoard");
docRef.get().then(function(samples){
  samples.forEach(function(doc){
    if(doc && doc.exists){
      const myData = doc.data();
      board.innerHTML += "  "+ myData[Object.keys(myData)[0]];
    }
    document.getElementsByTagName("button")[0].style.visibility = "visible";
    document.getElementById("loading").style.visibility = "hidden";

  });
});
var count = 0
var DOMURL = window.URL || window.webkitURL || window;
var li = [];
var img = [];
var svgl = document.getElementsByTagName('svg');
function initiat(){
 if(count<svgl.length){
   i=count;
   const lis = document.getElementById("l");
   svg = svgl[i];
   //console.log(svg);
   try {
     li.push(document.createElement('li'));
     console.log(li.length);
     lis.appendChild(li[i]);
     img.push(new Image());
   }
   catch(error) {
     console.error(error);
   }
   try {
     var data = (new XMLSerializer()).serializeToString(svg);
   } catch (e) {
     console.error(error);
   }
      var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
      var url = DOMURL.createObjectURL(svgBlob);

      img[i].onload = function () {
        // ctx.drawImage(img, 0, 0);
        li[i].appendChild(img[i]);
        console.log(0%6);
        li[i].innrHTML += EMOTIONS[i%6];
        li[i].style.backgroundColor = EMOTIONSCOLOR[i%6];
        console.log(lis);
        //DOMURL.revokeObjectURL(url);
        //console.log(ctx);
      };
      console.log(url);
    img[i].src = url;
    count+=1;
    setTimeout(imgload,50);
  }
}
function imgload(){
  if(count<svgl.length)
    initiat();
}
