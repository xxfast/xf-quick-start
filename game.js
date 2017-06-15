/**
 * Created by Isuru on 15/6/17.
 */

var xf = require('xf.js');

var c = document.createElement('canvas');
c.screencanvas = true; //more performance in Canvas+
var w = window.innerWidth;
var h = window.innerHeight;

c.width = w;
c.height = h;

var scale = Math.min(window.innerHeight / h, window.innerWidth / w);

c.style.position = "absolute";
c.style.width = (w * scale) + "px";
c.style.height = (h * scale) + "px";
c.style.left = (window.innerWidth * 0.5 - w * scale * 0.5) + "px";
c.style.top = (window.innerHeight * 0.5 - h * scale * 0.5) + "px";

document.body.appendChild(c);

var cc = c.getContext("2d");

var myGame = new xf.Game();

var arrow = new xf.Polygon([{x:10,y:0},{x:10,y:10},{x:0,y:+10},{x:30,y:30}],{fill:"red",stroke:"black"});

arrow.translate(200,200);
arrow.transform(60,60);
arrow.center();


var camera = new xf.Camera("camera_1").translate(150,150)
    .transform(500,400)
    .center();

var scene = new xf.Scene("welcome","#EAEAEA",c.width,c.height)
    .add(arrow)
    .observe(camera);


scene.initialise();

myGame.scenes().set(scene);

scene.transform(w,h);

function update(){
    arrow.rotate(-1);
    myGame.update();
    draw();
}

function draw(){
    scene.render(cc);
}


window.onload = function () {
    setInterval(update, 1000/60); // capped at 60fps
}
