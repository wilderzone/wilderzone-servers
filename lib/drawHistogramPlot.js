var cnv_enable = 0;
var cnv_width = window.innerWidth - 30; 
var cnv_height = 220;
var framerate = 30;
var margin_top = 0;
var margin_left = 0;
var margin_right = 0;
var margin_bottom = 44;
var padding_top = margin_top + 10;
var padding_left = margin_left + 20;
var padding_right = margin_right + 20;
var padding_bottom = margin_bottom + 0;

function setup(){
  var cnv = createCanvas(cnv_width, cnv_height);
	cnv.parent("canvas");
  cnv.style('display', 'block');
  frameRate(framerate);
}
function clearCanvas(){
  clear();
}
function windowResized(){
  cnv_width = window.innerWidth - 30;
  //cnv_height = window.innerHeight - 200;
  resizeCanvas(cnv_width, cnv_height);
  clearCanvas();
  cnv_enable = 1;
}
function draw(){
  //background("#FCFCFD");
  if(cnv_enable === 1){
    var numberOfDates = Object.keys(hdata).length;
    var pointStart = padding_left;
    var pointSpacing = (cnv_width - (padding_left + padding_right)) / (numberOfDates - 1);
    //Find the min and max values
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
    //Make the list of XY coordinates and month tags
    var points = [];
    var m = "";
    Object.keys(hdata).forEach(function(d){
      var posXY = [];
      var t = "";
      posXY[0] = pointStart;
      posXY[1] = (cnv_height - padding_bottom) - ((hdata[d] - min) / (max - min) * (cnv_height - (padding_top + padding_bottom + 20)));
      if(months[parseInt(d.substr(5,2)) - 1] != m){
        m = months[parseInt(d.substr(5,2)) - 1];
        t = m;
      }else if(Object.keys(hdata)[Object.keys(hdata).length - 1] == d){
        t = months[parseInt(d.substr(5,2)) - 1];
      }
      posXY[2] = t;
      points.push(posXY);
      pointStart += pointSpacing;
    });
    //Actually draw stuff
    var i = 0;
    Object.keys(hdata).forEach(function(d, i){
      //Points
      fill(69, 112, 255);
      stroke(69, 112, 255);
      strokeWeight(3);
      point(points[i][0], points[i][1]);
      //Text
      fill(0, 0, 0);
      strokeWeight(0);
      textSize(11);
      push();
      textAlign(CENTER, BOTTOM);
      text(hdata[d], points[i][0], points[i][1] - 4);
      pop();
      //Decender Lines
      stroke(211, 211, 211);
      strokeWeight(1);
      line(points[i][0], points[i][1], points[i][0], cnv_height - margin_bottom);
      //Plot Lines
      if(i != points.length - 1){
        stroke(69, 112, 255);
        strokeWeight(1);
        //line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
      }
      //Labels
      //shape_label(points[i][0], cnv_height - margin_bottom, d, 10);
      fill(0, 0, 0);
      strokeWeight(0);
      textSize(12);
      var t_vertical = "";
      for(var j = 0; j < points[i][2].length; j += 1){
        t_vertical += points[i][2].charAt(j) + "\n";
      }
      push();
      textAlign(CENTER, TOP);
      textLeading(11);
      text(t_vertical.toUpperCase(), points[i][0], cnv_height - margin_bottom + 4);
      pop();
      
      i++;
    });
    
    //Curvy Plot Line
    noFill();
    stroke(69, 112, 255);
    strokeWeight(1);
    beginShape();
    curveVertex(points[0][0], points[0][1]);
    for(var j = 0; j < points.length; j++){
      curveVertex(points[j][0], points[j][1]);
    }
    curveVertex(points[points.length - 1][0], points[points.length - 1][1]);
    endShape();
    
    /*
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
    */
    stroke(0, 0, 0);
    strokeWeight(1.3);
    line(0, cnv_height - margin_bottom, cnv_width, cnv_height - margin_bottom);
  }
  
  cnv_enable = 0;
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