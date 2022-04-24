//####################################################################################################################
//		Paint Application for Rectangle
//		Submitted by : Mohammed Shahid Hussain
//####################################################################################################################
//Following tasks has been carried in this application using HTML5 Canvas Element

//1.	It lets the user draw rectangles on the canvas by dragging mouse.
//2.	IT automatically fills a different color to every different rectangle.
//3.	A button has been added that clears the canvas.
//4.	Another feature added where user can drag rectangles using mouse.
//5.	On double click of a rectangle deletes it.

//	It has been tested on the following browsers:
//			Google Chrome
//			Mozilla Firefox
//			IE
//			Safari

//	Additionally, the size of the canvas has not been kept fixed, and it varies with the resizing of the browser window.
//	
//	1. Draw : Drag mouse anywhere on the canvas to draw rectangles.
//	2. Move	Manually : Click and drag the rectangle you want to move.
//	3. Delete : Double click on the rectangle you want to delete.
//	4. Clear : Clicking on the clear button deletes all the drawn rectangles and clears the canvas.
//	



let list=new Array();
var canvas=document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");




function generateRandomColor(){
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
    //random color will be freshly served
}

rect = {};
rectPrev={};
rectMove={};
drag = false;
motion=false;
var Mx=null, My=null;
var prevMotionX=0, prevMotionY=0;
function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener("dblclick", doubleClick);
}

function doubleClick(e){
  var mx=e.pageX - this.offsetLeft;
  var my=e.pageY - this.offsetTop;
  //console.log(mx);
  //console.log(my);
  //in order to delete the top most rectangle, we need to start scanning list from the end
  var len=list.length;
  for(var i=len-1;i>=0;i--){
    //checking if the point is inside recrangle given by list[i]
    if(mx>=list[i].startX && mx<=list[i].startX+list[i].w && my>=list[i].startY && my<=list[i].h+list[i].startY){

      //console.log('I got triggered');
      list.splice(i,1);
      //this deleted only when rectangle is drawn using top left to bottom right drag
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      list.forEach(function(rec){
        draw(rec);
        //console.log(rec);
      });
      break;
    }else if(mx<=list[i].startX && mx>=list[i].startX+list[i].w && my>=list[i].startY && my<=list[i].h+list[i].startY){
      //for top right to bottom left drag
      //console.log('i got triggered 2');
      list.splice(i,1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      list.forEach(function(rec){
        draw(rec);
        //console.log(rec);
      });
      break;
    }else if(mx<=list[i].startX && mx>=list[i].startX+list[i].w && my<=list[i].startY && my>=list[i].h+list[i].startY){
      //for bottom right to top left
      //console.log('i got triggered 3');
      list.splice(i,1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      list.forEach(function(rec){
        draw(rec);
        //console.log(rec);
      });
      break;
    }else if(mx>=list[i].startX && mx<=list[i].startX+list[i].w && my<=list[i].startY && my>=list[i].h+list[i].startY){
      //from bottom left to top right
      //console.log('i got triggered 4');
      list.splice(i,1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      list.forEach(function(rec){
        draw(rec);
        //console.log(rec);
      });
      break;
    }
  }
}

function mouseDown(e) {//when mouseDown, we set the starting X and Y coordinates
  color=generateRandomColor();
  //console.log(color);
  if(color=="#ffffff")color="#000000";
  ctx.fillStyle=color;
  rect.startX = e.pageX - this.offsetLeft;
  rect.startY = e.pageY - this.offsetTop;
  rectPrev.startX=e.pageX-this.offsetLeft;
  rectPrev.startY=e.pageY-this.offsetTop;
  var mx=e.pageX - this.offsetLeft;
  var my=e.pageY - this.offsetTop;
  //checking if the point where we clicked is on some rectangle or not
  var len=list.length;
  for(var i=len-1;i>=0;i--){
    //checking if the point is inside recrangle given by list[i]
    if(mx>=list[i].startX && mx<=list[i].startX+list[i].w && my>=list[i].startY && my<=list[i].h+list[i].startY){

      //console.log('I got triggered');
      motion=true;
      rectMove.startX=list[i].startX;
      rectMove.startY=list[i].startY;
      rectMove.h=list[i].h;
      rectMove.w=list[i].w;
      rectMove.color=list[i].color;
      list.splice(i,1);
      break;
    }else if(mx<=list[i].startX && mx>=list[i].startX+list[i].w && my>=list[i].startY && my<=list[i].h+list[i].startY){
      //for top right to bottom left drag
      motion=true;
      rectMove.startX=list[i].startX;
      rectMove.startY=list[i].startY;
      rectMove.h=list[i].h;
      rectMove.w=list[i].w;
      rectMove.color=list[i].color;
      list.splice(i,1);
      break;
    }else if(mx<=list[i].startX && mx>=list[i].startX+list[i].w && my<=list[i].startY && my>=list[i].h+list[i].startY){
      motion=true;
      rectMove.startX=list[i].startX;
      rectMove.startY=list[i].startY;
      rectMove.h=list[i].h;
      rectMove.w=list[i].w;
      rectMove.color=list[i].color;
      list.splice(i,1);
      break;
    }else if(mx>=list[i].startX && mx<=list[i].startX+list[i].w && my<=list[i].startY && my>=list[i].h+list[i].startY){
      //from bottom left to top right
      motion=true;
      rectMove.startX=list[i].startX;
      rectMove.startY=list[i].startY;
      rectMove.h=list[i].h;
      rectMove.w=list[i].w;
      rectMove.color=list[i].color;
      list.splice(i,1);
      break;
    }
  }
  if(motion){
    //we need to record the position of click, which is mx and my
    Mx=mx;
    My=my;
    draw2();
    //console.log('initial start for rectMove');
    //console.log(rectMove.startX);
  }else{
    drag = true;
  }
}

function mouseUp() {
  if(motion){
    //we need to add the new coordinates for the rectangle in the list
    if(rectMove.w && rectMove.h){
      list.push({startX:rectMove.startX,startY:rectMove.startY,w:rectMove.w,h:rectMove.h,color:rectMove.color});
    }
  }
  if(rect.w && rect.h){
    list.push({startX:rect.startX,startY:rect.startY,w:rect.w,h:rect.h,color:ctx.fillStyle});
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  list.forEach(function(rec){
    draw(rec);
    //console.log(rec);
  });



  rect.w = 0;//setting rect.w and rect.h to 0 so that on first instance of mouseMove after mouseDown the rectPrev doesn't clear anything
  rect.h = 0;
  rectMove={};
  prevMotionX=0;
  prevMotionY=0;
  Mx=0;
  My=0;
  drag = false;
  motion=false;
}

function mouseMove(e) {
  if (drag) {
    rectPrev.w=rect.w;
    rectPrev.h=rect.h;
    rect.w = ((e.pageX - this.offsetLeft) - rect.startX);
    rect.h = ((e.pageY - this.offsetTop) - rect.startY) ;
    draw2();
  }
  if(motion){
    //then we need to move rectangle
    motionX= (e.pageX - this.offsetLeft) - Mx;
    motionY = (e.pageY - this.offsetTop) - My;
    //console.log(motionX);
    //console.log('motion x');
    rectMove.startX+=motionX - prevMotionX;
    rectMove.startY+=motionY - prevMotionY;
    //console.log(rectMove.startX);

    //console.log(rectMove);
    prevMotionX=motionX;
    prevMotionY=motionY;
    draw2();

  }

}

function draw2(){
  if(drag){
    ctx.clearRect(rectPrev.startX,rectPrev.startY,rectPrev.w,rectPrev.h);
    if(list.length>0){
    list.forEach(function(rec){
    draw(rec);
    //console.log(rec);
  });}
  ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
  }else{
    var temp=ctx.fillStyle;
    ctx.fillStyle=rectMove.color;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(list.length>0){
    list.forEach(function(rec){
    draw(rec);
    //console.log(rec);
  });}
    ctx.fillRect(rectMove.startX, rectMove.startY, rectMove.w, rectMove.h);
    ctx.fillStyle=temp;
  }


}

function draw(obj) {
  //console.log(obj.color);
  var temp=ctx.fillStyle;//so that the new random color generated is available for next rectangle and is not lost while drawing old rectangles
  ctx.fillStyle=obj.color;
  ctx.fillRect(obj.startX, obj.startY, obj.w, obj.h);
  ctx.fillStyle=temp;
}

init();

document.getElementById('reset').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        list=[];
      });
