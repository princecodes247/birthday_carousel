// adding single confetti animation
// window.onload = function() {
//   var popper = document.createElement("div");
//   popper.innerHTML = "🎉";
//   popper.style.fontSize = "72px";
//   popper.style.position = "fixed";
//   popper.style.top = "0";
//   popper.style.left = "0";
//   popper.style.right = "0";
//   popper.style.bottom = "0";
//   popper.style.margin = "auto";
//   popper.style.animation = "popper 1s ease-out 0s 1 normal forwards running";
//   document.body.appendChild(popper);
// };

// adding white multiple confetti animation
const confettiContainer = document.getElementById("confetti-container");
const confettiElements = document.querySelectorAll(".confetti");

// Set the initial positions of the confetti elements
confettiElements.forEach(element => {
  element.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
  element.style.top = `-${Math.floor(Math.random() * window.innerHeight)}px`;
});

// Animate the confetti elements
confettiElements.forEach(element => {
  const duration = Math.floor(Math.random() * 4 + 4);
  const delay = Math.floor(Math.random() * 2);
  const angle = Math.floor(Math.random() * 360);

  element.style.transition = `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`;
  element.style.transform = `rotate(${angle}deg) translateY(${window.innerHeight +
    element.offsetHeight}px)`;
  element.style.opacity = 0;
});


// adding red multiple confetti animation
const confetti2Container = document.getElementById("confetti2-container");
const confetti2Elements = document.querySelectorAll(".confetti2");

// Set the initial positions of the confetti elements
confetti2Elements.forEach(element => {
  element.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
  element.style.top = `-${Math.floor(Math.random() * window.innerHeight)}px`;
});

// Animate the confetti elements
confetti2Elements.forEach(element => {
  const duration = Math.floor(Math.random() * 4 + 4);
  const delay = Math.floor(Math.random() * 2);
  const angle = Math.floor(Math.random() * 360);

  element.style.transition = `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`;
  element.style.transform = `rotate(${angle}deg) translateY(${window.innerHeight +
    element.offsetHeight}px)`;
  element.style.opacity = 0;
});


// adding green multiple confetti animation
const confetti3Container = document.getElementById("confetti3-container");
const confetti3Elements = document.querySelectorAll(".confetti3");

// Set the initial positions of the confetti elements
confetti3Elements.forEach(element => {
  element.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
  element.style.top = `-${Math.floor(Math.random() * window.innerHeight)}px`;
});

// Animate the confetti3 elements
confetti3Elements.forEach(element => {
  const duration = Math.floor(Math.random() * 4 + 4);
  const delay = Math.floor(Math.random() * 2);
  const angle = Math.floor(Math.random() * 360);

  element.style.transition = `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`;
  element.style.transform = `rotate(${angle}deg) translateY(${window.innerHeight +
    element.offsetHeight}px)`;
  element.style.opacity = 0;
});


var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control



// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// add background music
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};
