var cnv_enable = 0;
var cnv_width = window.innerWidth - 30; 
var cnv_height = window.innerHeight - 200;
var framerate = 30;
var margin_top = 50;
var margin_left = 50;
var margin_right = 30;
var margin_bottom = 100;
var padding_top = margin_top + 30;
var padding_left = margin_left + 30;
var padding_right = margin_right + 30;
var padding_bottom = margin_bottom + 0;

function setup(){
  var cnv = createCanvas(cnv_width, cnv_height);
	cnv.parent("pageContent");
  cnv.style('display', 'block');
  frameRate(framerate);
}
function windowResized(){
  cnv_width = window.innerWidth - 30;
  cnv_height = window.innerHeight - 200;
  resizeCanvas(cnv_width, cnv_height);
}
function draw(){
  background(255,255,255);
  if(cnv_enable === 1){
    var numberOfDates = Object.keys(hdata).length;
    var pointStart = padding_left;
    var pointSpacing = (cnv_width - (padding_left + padding_right)) / (numberOfDates - 1);
    
    var min = Infinity;
    var max = 0;
    Object.keys(hdata).forEach(function(d){
      var n = hdata[d];
      if(n < min){
        min = n;
      }
      if(n > max){
        max = n;
      }
    });
    
    var points = [];
    var i = 0;
    Object.keys(hdata).forEach(function(d){
      var posXY = [];
      posXY[0] = pointStart;
      posXY[1] = (cnv_height - padding_bottom) - ((hdata[d] - min) / (max - min) * (cnv_height - (padding_top + padding_bottom + 20)));
      points.push(posXY);
      pointStart += pointSpacing;
    });
    
    i = 0;
    Object.keys(hdata).forEach(function(d){
      //Points
      fill(69, 112, 255);
      stroke(69, 112, 255);
      strokeWeight(3);
      point(points[i][0], points[i][1]);
      //Text
      fill(0, 0, 0);
      strokeWeight(0);
      textSize(10);
      text(hdata[d], points[i][0], points[i][1] - 4);
      //Decender Lines
      stroke(211, 211, 211);
      strokeWeight(1);
      line(points[i][0], points[i][1], points[i][0], cnv_height - margin_bottom);
      //Connecting Lines
      if(i != points.length - 1){
        stroke(69, 112, 255);
        strokeWeight(1);
        line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
      }
      //Labels
      shape_label(points[i][0], cnv_height - margin_bottom, d, 10);
      i++;
    });
    
    //Title
    fill(0, 0, 0);
    strokeWeight(0);
    textSize(14);
    text("Players Over Time", 10, 22);
    //Axis
    stroke(0, 0, 0);
    strokeWeight(1);
    line(margin_left, margin_top, margin_left, cnv_height - margin_bottom);
    line(margin_left, cnv_height - margin_bottom, cnv_width - margin_right, cnv_height - margin_bottom);
  }
}

function shape_label(posX, posY, t, t_size){
  var t_half = (t_size / 2) + 1;
  var L = t_size * (t.length - 1) + 1;
  stroke(211, 211, 211);
  strokeWeight(1);
  line(posX, posY, posX + t_half, posY + t_half);
  line(posX + t_half, posY + t_half, posX + t_half, posY + t_half + L);
  line(posX + t_half, posY + t_half + L, posX - t_half, posY + t_half + L);
  line(posX - t_half, posY + t_half + L, posX - t_half, posY + t_half);
  line(posX - t_half, posY + t_half, posX, posY);
  fill(0, 0, 0);
  strokeWeight(0);
  textSize(t_size);
  var t_vertical = "";
  for(var i = 0; i < t.length; i += 1){
    t_vertical += t.charAt(i) + "\n";
  }
  push(); //Use push and pop to restore style
  textAlign(CENTER, TOP);
  textLeading(t_size - 1);
  text(t_vertical, posX, posY + t_half);
  pop();
}