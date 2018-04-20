function shapes(shape,event){
  this.shape = shape;
  this.scalex = 1;
  this.scaley = 1;
  this.state = 0;
  if(shape == db.length)
    this.fig = draw2.ellipse(60 ,60).transform({ x : event.clientX-x }).transform({ y : event.clientY-y});
  else
    if(shape<5)
      this.fig = draw2.polyline(db[shape][0]).transform({ x : event.clientX-x }).transform({ y : event.clientY-y});
    else{
      this.fig = draw2.path(db[shape][0]).transform({ x : event.clientX-x }).transform({ y : event.clientY-y});
    }
  this.fig.id = elem.length;
  elem.push(this);
  this.fig.rotate(0);
  if(shape<5 || shape == db.length)
    this.fig.fill(selectedColor);
    else{
      this.fig.fill('none');
      this.fig.stroke({ color: selectedColor, width: 10});
    }
  this.fig.on('click',function(){
      ractivate(this.id);
  });
  this.fig.on('wheel',function(event){
    if((activeShape.scalex+event.deltaY/10 < 0.1) || (activeShape.scaley+event.deltaY/10 < 0.1)){
      console.log(event.deltaY);
    }else{
      if(document.getElementById("skewx").checked == true)
      {
        activeShape.scalex+=event.deltaY/10;
      }
      if(  document.getElementById("skewy").checked == true){
        activeShape.scaley+=event.deltaY/10;
      }
      activeShape.fig.transform({ scaleX : activeShape.scalex ,scaleY: activeShape.scaley});
    }
    if(  document.getElementById("rotate").checked == true)
      activeShape.fig.transform({rotation: event.deltaY/10, relative: true});
  });
  this.Move = function(event){
    this.fig.transform({ x : event.clientX-x- activeShape.fig.width()*this.scalex/2}).transform({ y : event.clientY-y-activeShape.fig.height()*this.scaley/2});
  }
  this.kill = function(){
    var d = this.fig.id;
    this.fig.remove();
    //elem.splice(d, 1);
  }
}
