let player="Guest";
let modal=document.getElementById("modal");
let area=document.getElementById("gameArea");

function saveName(){
player=document.getElementById("playerName").value||"Guest";
alert("Welcome "+player);
}

function toggleMusic(){
let music=document.getElementById("bgMusic");
music.paused?music.play():music.pause();
}

function closeGame(){
modal.style.display="none";
area.innerHTML="";
}

/* Leaderboard */
function updateLeaderboard(game,score){
let data=JSON.parse(localStorage.getItem(game))||[];
data.push({name:player,score:score});
data.sort((a,b)=>b.score-a.score);
data=data.slice(0,5);
localStorage.setItem(game,JSON.stringify(data));
showLeaderboard(game);
}

function showLeaderboard(game){
let data=JSON.parse(localStorage.getItem(game))||[];
let html="<h2>"+game+" Leaderboard</h2>";
data.forEach(d=>{html+=<p>${d.name}: ${d.score}</p>});
document.getElementById("leaderboard").innerHTML=html;
}

/* 🐍 Snake */
function openSnake(){
modal.style.display="block";
area.innerHTML='<canvas id="snake" width="400" height="400"></canvas>';
let canvas=document.getElementById("snake");
let ctx=canvas.getContext("2d");
let box=20;
let snake=[{x:200,y:200}];
let food={x:100,y:100};
let score=0;
let dir;

document.onkeydown=e=>{
if(e.key==="ArrowUp")dir="UP";
if(e.key==="ArrowDown")dir="DOWN";
if(e.key==="ArrowLeft")dir="LEFT";
if(e.key==="ArrowRight")dir="RIGHT";
};

function draw(){
ctx.fillStyle="black";
ctx.fillRect(0,0,400,400);
snake.forEach(s=>ctx.fillRect(s.x,s.y,box,box));
ctx.fillStyle="red";
ctx.fillRect(food.x,food.y,box,box);

let head={x:snake[0].x,y:snake[0].y};
if(dir==="UP")head.y-=box;
if(dir==="DOWN")head.y+=box;
if(dir==="LEFT")head.x-=box;
if(dir==="RIGHT")head.x+=box;

if(head.x===food.x && head.y===food.y){
score++;
food={x:Math.floor(Math.random()*19)*box,y:Math.floor(Math.random()*19)*box};
}else snake.pop();

if(head.x<0||head.y<0||head.x>=400||head.y>=400){
clearInterval(game);
updateLeaderboard("Snake",score);
alert("Game Over Score: "+score);
}

snake.unshift(head);
}

let game=setInterval(draw,150);
}

/* ❌ Tic Tac Toe */
function openTic(){
modal.style.display="block";
area.innerHTML="<h2>Coming Soon Advanced Version</h2>";
}

/* 🧠 Memory */
function openMemory(){
modal.style.display="block";
area.innerHTML="<h2>Coming Soon Advanced Version</h2>";
}

/* ⚡ Reaction */
function openReaction(){
modal.style.display="block";
area.innerHTML='<button id="reactBtn">Wait...</button>';
let btn=document.getElementById("reactBtn");
let start;
setTimeout(()=>{
btn.innerText="CLICK!";
start=Date.now();
btn.onclick=()=>{
let time=Date.now()-start;
updateLeaderboard("Reaction",1000-time);
alert("Time: "+time+"ms");
};
},2000+Math.random()*2000);
}

/* 🎯 Catch Box */
function openCatch(){
modal.style.display="block";
area.innerHTML='<div id="box" style="width:50px;height:50px;background:red;position:absolute;"></div>';
let box=document.getElementById("box");
let score=0;
box.onclick=()=>{
score++;
box.style.top=Math.random()*300+"px";
box.style.left=Math.random()*300+"px";
};
setTimeout(()=>{
updateLeaderboard("Catch",score);
alert("Score: "+score);
},10000);
}
