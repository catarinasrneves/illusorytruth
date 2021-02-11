let sel;
let t;

var p;
var sSlider;

var angle = 0;

var distance, b, b2;

let video;
let poseNet;

let lefteyeX=0;
let lefteyeY=0;

let righteyeX=0;
let righteyeY=0;

function setup() {
  createCanvas(innerWidth, innerHeight);
    video = createCapture(VIDEO);
    video.hide();
    
    console.log(ml5);
    poseNet = ml5.poseNet(video,modelReady);
    poseNet.on('pose', gotPoses);
  
  
  //text position + size
  textAlign(CENTER, CENTER);
  textSize(60);
  
  
  dropdown1 = createSelect();
  dropdown1.option('subtle');
  dropdown1.option('repetition');
  dropdown1.option('413');
  dropdown1.option('361');
    
    
    dropdown2 = createSelect();
  dropdown2.option('mouse');
  dropdown2.option('time');
  dropdown2.option('camera');

    
    
    
  dropdown1.changed(newSelection);
    dropdown2.changed(newSelection);
    
    
//style dropdown 

    dropdown1.position(width/4,height/1.2);
    dropdown1.style ('width', '130px');
    dropdown1.style ('height','5vh');
    dropdown1.style('background-color', 'transparent');
    dropdown1.style('border', 'none');
    dropdown1.style('border-bottom', 'solid', '5px', 'blue');
    dropdown1.style('font-family', 'GT SetraMedium');
    dropdown1.style('font-size', '16px');
    dropdown1.style('padding-left', '0.1em');
    dropdown1.style('padding-rigth', '1em');
    
    
    dropdown2.position(width/2.5,height/1.2);
    dropdown2.style ('width', '130px');
    dropdown2.style ('height','5vh');
    dropdown2.style('background-color', 'transparent');
    dropdown2.style('border', 'none');
    dropdown2.style('border-bottom', 'solid', '5px', 'blue');
    dropdown2.style('font-family', 'GT SetraMedium');
    dropdown2.style('font-size', '16px');
    dropdown2.style('padding-left', '0.1em');
    dropdown2.style('padding-rigth', '1em');
  
  
  // create sliders type
  sSlider = createSlider(400,900, 400);
  sSlider.position(width/1.8,height/1.17);
  
  
  sSlider.input(updateSize);
    
    
    
    b=200
    b2=100
    
    
  
}



function gotPoses(poses){
    //console.log(poses);
    
    if (poses.length >0){
    let nleX = poses[0].pose.keypoints[1].position.x;
    let nleY = poses[0].pose.keypoints[1].position.y;
        
    let nreX = poses[0].pose.keypoints[2].position.x;
    let nreY = poses[0].pose.keypoints[2].position.y;
        
        lefteyeX = lerp(lefteyeX,nleX,0.5);
        lefteyeY = lerp(lefteyeY,nleY,0.5);
        
        righteyeX = lerp(righteyeX,nreX,0.5);
        righteyeY = lerp(righteyeY,nreY,0.5);
        
    }    
}





function draw() {
  //background(sSlider.value());
   
  background(255); 
  
  
  
  if (dropdown1.value() == 'subtle') {
    var p = select ('#p');  
    p.style('font-family','Illusory');   
  } 
  
  if (dropdown1.value() == 'repetition') {
    var p = select ('#p');  
    p.style('font-family','repetition');   
  } 
  
   if (dropdown1.value() == '413') {
    var p = select ('#p');  
    p.style('font-family','hey413');   
  } 
  
  if (dropdown1.value() == '361') {
    var p = select ('#p');  
    p.style('font-family','hey361');
    p.style('-webkit-text-stroke', '5px');
     p.style('-webkit-text-stroke','white');
      
       
      
        
  } 
    

    
    
if (dropdown2.value() == 'time') {
    var p = select ('#p'); 
    
        var x = map( tan (angle), -1,1,400,900) ;
        sSlider.value(x);

        angle += 0.006;
      
        textSize(15);
        fill(0);
        //timeline= text('timeline', sSlider.x *1.1 + sSlider.width, height/1.15);
    
        p.style('font-weight', sSlider.value());
    
        sSlider.hide();
  } 
    
     
if (dropdown2.value() == 'mouse') {
    var p = select ('#p'); 
    
    //let pfat = constrain(map(mouseX,0,width,1,999),1,999);
    
    //p.style('font-weight', pfat);
    distance =dist(mouseX, mouseY, innerWidth/2, innerHeight/2)
 
 if((innerWidth/9<mouseX)&&(innerWidth/0.2>mouseX)&&(innerHeight/2.7<mouseY)&&(innerHeight/1.8>mouseY)){
    p.style('font-weight', '900');
    }
  else{
    p.style('font-weight', '400'); }
    
  
    
    sSlider.hide();
    
  } 
   
  
 
  
  if (dropdown2.value() == 'camera') {
  
  image(video,0,0, 200,150)
      
      let d = dist(lefteyeX,lefteyeY,righteyeX,righteyeY);
      if(d > 110){
    p.style('font-weight', '900');
    }
  else{
    p.style('font-weight', '400'); }
      
      
//      fill(255,0,0);
//      circle(lefteyeX,lefteyeY, d);
//      
//      fill(100,0,0);
//      circle(righteyeX,righteyeY, 100);
      
  }
 
  
  
}


function updateSize(){
var p = select ('#p');
p.style('font-weight', sSlider.value());
 }


function newSelection() {
  console.log(dropdown.value()); 
}


function modelReady(){
    console.log('model ready');
}




