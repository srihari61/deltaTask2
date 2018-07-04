var paper=document.getElementById("drawingPaper");

var ctx=paper.getContext('2d');
var h=0; var h1=0;
var ball={x:0,y:200,radius:10 };
var topPipe={x:470, y:0, width:5, height:175 };
var bottomPipe={x:470, y:225, width:5, height:175 };
var points=0;
var backgdGradient;

draw();

function draw()
{
	//draw Initial setup
	
    backgdGradient=ctx.fillLinearGradient(0,0,400,0);
    backgdGradient.addColorStop(0,"blue");
    backgdGradient.addColorStop(0.8,"white");
    backgdGradient.addColorStop(0.8,"green");
    backgdGradient.addColorStop(1,"white");
    ctx.fillStyle=backgdGradient;
    ctx.fillRect(0,0,475,400);

    ctx.fillRect(topPipe.x,topPipe.y,topPipe.width,topPipe.height);
    ctx.fillRect(bottomPipe.x,bottomPipe.y,bottomPipe.width,bottomPipe.height);
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI * 2);
    ctx.fillStyle="red";
    ctx.fill();

	document.getElementById("Start").addEventListener("click","drawScreen");
	document.getElementById("Restart").addEventListener("click","drawscreen");
	points=0;
	drawScore();
}

function drawScreen()
{
    //ctx.clearRect(0, 0, 475,400);
    backgdGradient=ctx.fillLinearGradient(0,0,400,0);
    backgdGradient.addColorStop(0,"blue");
    backgdGradient.addColorStop(0.8,"white");
    backgdGradient.addColorStop(0.8,"green");
    backgdGradient.addColorStop(1,"white");
    ctx.fillStyle=backgdGradient;
    ctx.fillRect(0,0,475,400);

    ctx.onmousemove=moveMouse(event);

    moveBall();
    moveTopPipe();
    
    moveBottomPipe();
   
    collisionCheck();

    drawScore();

    requestAnimationframe(drawScreen);
}
drawScreen();

function moveMouse(e)
{
	mouseX=e.clientX;
	mouseY=e.clientY;
}
function moveBall()
{

	if (ball.x > mouseX) 
	{
	 ball.x -= 5;

    }
    else
    {
	 ball.x += 5;
	}
	if (ball.y > mouseY) 
	{
	 ball.y -= 5;
	}
	else
	{
	 ball.y += 5;
	}

	//ctx.clearRect(0, 0, canvas.width, canvas.height);
				
	ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2* Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();	
	points++;
}

function moveTopPipe()
{
    h=getRandomInt(0,176);

    topPipe.x-=5;
    topPipe.height=h;
    
    ctx.fillRect(topPipe.x,0,topPipe.width,topPipe.height);
    ctx.fillStyle="rgb(255,192,203)";
    ctx.fill();       
} 

function moveBottomPipe()
{
	h1=400-h-30;

	bottomPipe.x-=5;
	bottomPipe.height=h1;

	ctx.fillRect(bottomPipe.x,400- bottomPipe.height,bottomPipe.width,bottomPipe.height);
	ctx.fillStyle="rgb(255, 165, 0)";
	ctx.fill();
}

function collisionCheck()
{
	if(((ball.x+ball.radius)>=(topPipe.x))&&((ball.y-ball.radius)<=(topPipe.height)))
	{
       //stop game                                                                                    How to stop game na instead of reloading?
       	draw()                                                                                      //  Is this correct na?
	}
	else if(((ball.x+ball.radius)>=(bottomPipe.x))&&((400-ball.y-ball.radius)<=(bottomPipe.height)))
	{
        //stop game
        draw()  
                                                                                        //   Is this correct na?
	}	

	else if((ball.y-ball.radius==0)||(ball.y+ball.radius==400)||(ball.x-ball.radius==0))
	{
		//stop game
        draw()                                                                                   //   Is this correct na?
	}
}

function drawScore()
{
	document.getElementById("score").innerHTML=points;
}

function getRandomInt(var min,var max)
{
	min=Math.ceil(min);
	max=Math.floor(max);
	returb Math.floor(Math.random()*(max-min))+min;
}