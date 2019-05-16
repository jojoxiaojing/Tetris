
//constant
var GAME_AREA_WIDTH = 10;
var GAME_AREA_HEIGHT = 18;
var GAME_AREA_TOP = 10;
var GAME_AREA_LEFT = 10;

//Score
var SCORE_TEXT_X = GAME_AREA_LEFT + GAME_AREA_WIDTH * BLOCK_SIZE + 100 ;
var SCORE_TEXT_Y = GAME_AREA_TOP + 10;
var SCORE_NUMBER_X = GAME_AREA_LEFT + GAME_AREA_WIDTH * BLOCK_SIZE + 100 ;
var SCORE_NUMBER_Y = GAME_AREA_TOP + 30;

//Next
var NEXT_BLOCK_AREA_TOP = GAME_AREA_TOP + 50;
var NEXT_BLOCK_AREA_LEFT = GAME_AREA_LEFT + GAME_AREA_WIDTH * BLOCK_SIZE + 50;
var NEXT_BLOCK_AREA_WIDTH = 6 * BLOCK_SIZE;
var NEXT_BLOCK_AREA_HEIGHT = 5 * BLOCK_SIZE;
var NEXT_BLOCK_X = NEXT_BLOCK_AREA_LEFT + BLOCK_SIZE * 2;
var NEXT_BLOCK_Y = NEXT_BLOCK_AREA_TOP + BLOCK_SIZE * 2;

//canvas
var main_canvas;
var main_context;
var MAIN_CONTEXT_WIDTH = 400;
var MAIN_CONTEXT_HEIGHT = 380;
var sign_canvas;
var sign_context;

var currentBlock;
var nextBlock;
var blockPositionX;
var blockPositionY;
var currentScore;

var fFalling;
var fallingCycleTag;
var currentFallingInterval;
var FALL_INTERVAL_CHANGE_RATE = 0.9;

var bitmapArray = new Array();  //0为空,1~7为颜色,-1为消去
//Bit Map
//顺序为从左上至右下，row=0为最上一层
function getBitMapInfo(row,column)
{
    if (row < GAME_AREA_HEIGHT && column < GAME_AREA_WIDTH )
    {
        return bitmapArray[row * GAME_AREA_WIDTH + column];
    }
    else
    {
        return 0;
    }
}
function setBitMapInfo(row,column,color)
{
    if (row < GAME_AREA_HEIGHT && column < GAME_AREA_WIDTH )
    {
        bitmapArray[row * GAME_AREA_WIDTH + column] = color;
    }
    else
    {
        return 0;
    }
}

function init()
{
    //canvas
    main_canvas = document.getElementById("main_canvas");
    main_context = main_canvas.getContext("2d");
    sign_canvas = document.getElementById("sign_canvas");
    sign_context = sign_canvas.getContext("2d");

    startInit();
}

////////////////////////////////////////////////////////////////////////
//Start Scene
function startInit()
{
    drawPreScene();
    main_canvas.addEventListener('mousemove',startMouseMoveDetect,false)
    main_canvas.addEventListener('mouseup',startMouseUpDetect,false);
    fMouseInStartButton = false;
}
function mouseInStartButton(x,y)
{
    var distantX, distantY;
    distantX = x - MAIN_CONTEXT_WIDTH / 2;
    distantY = y - (MAIN_CONTEXT_HEIGHT / 2 + 30);

    if (distantX < 50 && distantX > -50 && distantY < 20 && distantY > -20)
    {
        return true;
    }
    else
    {
        return false;
    }
}
var fMouseInStartButton;
function startMouseMoveDetect(ev)
{
    var mouseX, mouseY;
    if (ev.layerX || ev.layerX == 0)
    {
        mouseX = ev.layerX;
        mouseY = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0)
    {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }
    if (mouseInStartButton(mouseX,mouseY))
    {
        fMouseInStartButton = true;
    }
    else
    {
        fMouseInStartButton = false;
    }
    drawPreScene();
}

function startMouseUpDetect(ev)
{
    var mouseX, mouseY;
    if (ev.layerX || ev.layerX == 0)
    {
        mouseX = ev.layerX;
        mouseY = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0)
    {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }

    if (mouseInStartButton(mouseX,mouseY))
    {
        main_canvas.removeEventListener("mousemove",startMouseMoveDetect);
        main_canvas.removeEventListener("mouseup",startMouseUpDetect);
        gameInit();
    }
}

function drawPreScene()
{
    main_context.fillStyle = "rgb(0,0,0)";
    main_context.strokeStyle = "rgb(0,0,0)";

    main_context.textAlign = "center";

    main_context.fillRect(0,0,MAIN_CONTEXT_WIDTH,MAIN_CONTEXT_HEIGHT);

    main_context.font = "italic 50px sans-serif";
    main_context.fillStyle = "rgb(255,255,255)";
    main_context.strokeStyle = "rgb(255,255,255)";
    main_context.fillText('Tetris',MAIN_CONTEXT_WIDTH/2 - 10,MAIN_CONTEXT_HEIGHT/2 - 80);


    main_context.font = "italic 30px sans-serif";

    if (fMouseInStartButton)
    {
        main_context.fillStyle = "rgb(0,0,255)";
        main_context.strokeStyle = "rgb(0,0,255)";
    }
    else
    {
        main_context.fillStyle = "rgb(255,255,255)";
        main_context.strokeStyle = "rgb(255,255,255)";
    }
//            main_context.fillRect(0,0,MAIN_CONTEXT_WIDTH/2,MAIN_CONTEXT_HEIGHT/2);
    main_context.fillText('Start',MAIN_CONTEXT_WIDTH/2 - 10,MAIN_CONTEXT_HEIGHT/2 + 30);

    main_context.fillStyle = "rgb(0,0,0)";
    main_context.strokeStyle = "rgb(0,0,0)";

//            gameInit();

}


////////////////////////////////////////////////////////////////////////
//Game Logic
function gameInit()
{
    //bitmapArray
    for(var i = 0; i < GAME_AREA_WIDTH * GAME_AREA_HEIGHT; i++)
    {
        bitmapArray[i] = 0;
    }

    currentScore = 0;

    nextBlock = getRandomBlock();
    getNextBlock();

    gameRedraw();

    //key listener
    window.addEventListener('keydown',handleKeyDown,false);
//            main_canvas.addEventListener('keydown',handleKeyDown,false);

    //开始下落
    currentFallingInterval = 500;
    beginFalling();
}


function beginFalling()
{
    fFalling = true;

    fallingCycleTag = window.setInterval(fallingCycle,currentFallingInterval);
}
function fallingCycle()
{
    if (fFalling)
    {
        moveCurrentBlock(0,1);
    }
}



function getNextBlock()
{
    currentBlock = nextBlock;
    nextBlock = getRandomBlock();
    blockPositionX = parseInt(GAME_AREA_WIDTH / 2 - 1);
    blockPositionY = 0;
}

////////////////////////////////////
//KeyBoard Handler
function handleKeyDown(event)
{

    var keyCode;
    if (event == null)
    {
        keyCode = window.event.keyCode;
        if(keyCode >= 37 && keyCode <= 40)
        {
            window.event.preventDefault();
        }
    }
    else
    {
        keyCode = event.keyCode;
        if(keyCode >= 37 && keyCode <= 40)
        {
            event.preventDefault();
        }
    }

    switch(keyCode)
    {
        case 37:        //Left
            handleLeftKey();
//                      alert("Left");
            break;
        case 38:        //Top
            handleUpKey();
//                      alert("Top");
            break;
        case 39:        //Right
            handleRightKey();
//                      alert("Right");
            break;
        case 40:        //Down
            handleDownKey();
//                      alert("Down");
            break;
    }
}
function handleUpKey()
{
    currentBlock.rotate();
    if(detectConflict(0,0))
    {
        currentBlock.rotateBack();
    }
    gameRedraw();
}
function handleDownKey()
{
    moveCurrentBlock(0,1);

}
function handleLeftKey()
{
    moveCurrentBlock(-1,0);

}
function handleRightKey()
{
    moveCurrentBlock(1,0);

}

////////////////////////////////////
//Detect
function detectConflict(offsetX,offsetY)
{
    var bLeft = getBlockLeft(currentBlock);
    var bRight = getBlockRight(currentBlock);
    var bBottom = getBlockBottom(currentBlock);

    if(parseInt(bRight + blockPositionX + offsetX) >= parseInt(GAME_AREA_WIDTH))
    {
        return true;
    }
    if(parseInt(bLeft + blockPositionX + offsetX) < parseInt(0))
    {
        return true;
    }
    if (parseInt(bBottom + blockPositionY + offsetY) >= parseInt(GAME_AREA_HEIGHT))
    {
        return true;
    }
    for (var i = 0; i < currentBlock.points.length; i++)
    {
        var bX = blockPositionX + currentBlock.points[i].x + offsetX;
        var bY = blockPositionY + currentBlock.points[i].y + offsetY;
        if (getBitMapInfo(bY, bX) != 0)
        {
            return true;
        }
    }
    return false;
}

////////////////////////////////////
//Block Movement
function moveCurrentBlock(mX, mY)       //mX = 1 or -1, mY = 1
{
    if (!fFalling)
    {
        return;
    }
    if (mX == 1 && mY == 0)             //Move Right
    {
        if (!detectConflict(1,0))
        {
            blockPositionX += 1;
            gameRedraw();
        }
    }
    else if (mX == -1 && mY == 0)       //Move Left
    {
        if (!detectConflict(-1,0))
        {
            blockPositionX -= 1;
            gameRedraw();
        }
    }
    else if (mX == 0 && mY == 1)        //Move Down
    {
        if (detectConflict(0,1))
        {
            if (!addBlockToBitmap())
            {
                return;
            }

            if (blockDetect())
            {
            }
            else
            {
                getNextBlock();
                gameRedraw();
            }
        }
        else
        {
            blockPositionY += 1;
            gameRedraw();
        }
    }
}
function addBlockToBitmap()
{
    for(var i = 0; i < currentBlock.points.length; i++)
    {
        var point = currentBlock.points[i];
        var x = point.x + blockPositionX;
        var y = point.y + blockPositionY;
        if (y < 1)
        {
            gameEnd();
            return false;
        }
        else
        {
            setBitMapInfo(y, x, currentBlock.color);
        }
    }
    return true;
}

//Draw
function drawCurrentBlock()
{
    drawBlock(GAME_AREA_LEFT + blockPositionX * BLOCK_SIZE, GAME_AREA_TOP + blockPositionY * BLOCK_SIZE, currentBlock, main_context);
}

function gameRedraw()
{
    main_context.fillStyle = "rgb(0,0,0)";
    main_context.strokeStyle = "rgb(0,0,0)";

    main_context.fillRect(0,0,MAIN_CONTEXT_WIDTH,MAIN_CONTEXT_HEIGHT);
    //game area

    main_context.clearRect(GAME_AREA_LEFT, GAME_AREA_TOP,GAME_AREA_WIDTH * BLOCK_SIZE,GAME_AREA_HEIGHT * BLOCK_SIZE);

    for (var row = 0; row < GAME_AREA_HEIGHT; row++)
    {
        for (var column = 0; column < GAME_AREA_WIDTH; column++)
        {
            var color = getBitMapInfo(row,column);
            if(color > 0 )
            {
                var y = GAME_AREA_TOP + row * BLOCK_SIZE;
                var x = GAME_AREA_LEFT + column * BLOCK_SIZE;
                preBitMapImg(color,x,y,main_context);
            }
        }
    }

    //Score area

    main_context.font = "italic 20px sans-serif";

    main_context.fillStyle = "rgb(255,255,255)";
    main_context.strokeStyle = "rgb(255,255,255)";

    main_context.fillText('Score', SCORE_TEXT_X, SCORE_TEXT_Y);
    main_context.fillText(currentScore, SCORE_NUMBER_X, SCORE_NUMBER_Y);


    //next area
    main_context.clearRect(NEXT_BLOCK_AREA_LEFT, NEXT_BLOCK_AREA_TOP, NEXT_BLOCK_AREA_WIDTH, NEXT_BLOCK_AREA_HEIGHT);
    drawBlock(NEXT_BLOCK_X, NEXT_BLOCK_Y, nextBlock, main_context);

    //currentBlock
    drawCurrentBlock();

    main_context.fillStyle = "rgb(0,0,0)";
    main_context.strokeStyle = "rgb(0,0,0)";

}

function preBitMapImg(color,x,y,context)
{
    var imgName = getColorImage(color);
    var img = new Image();
    img.src = imgName;
    if (img.complete)
    {
        context.drawImage(img,x, y, BLOCK_SIZE, BLOCK_SIZE);
        return;
    }
    img.onload = function()
    {
        context.drawImage(img,x, y, BLOCK_SIZE, BLOCK_SIZE);
    };
}

//Detect
function blockDetect()
{
    var disappearArray = new Array;
    for (var row = 0; row < GAME_AREA_HEIGHT; row++)
    {
        var fDisappear = true;
        for (var column = 0; column < GAME_AREA_WIDTH; column++)
        {
            if (getBitMapInfo(row,column) == 0)
            {
                fDisappear = false;
                break;
            }
        }
        if (fDisappear)
        {
            disappearArray.push(row);
        }
    }

    if (disappearArray.length != 0)
    {
        //有方块需要消去
        fFalling = false;
        currentBlock = null;
        //加分
        currentScore += disappearArray.length * disappearArray.length * 100;
        for(var i = 0; i < disappearArray.length; i++)
        {
            //加快下落速度
            currentFallingInterval *= FALL_INTERVAL_CHANGE_RATE;
        }
        disppearBlock(disappearArray);
        window.clearInterval(fallingCycleTag);
        fallingCycleTag = window.setInterval(fallingCycle,currentFallingInterval);
        return true;
    }
    else
    {
        return false;
    }
}

function disppearBlock(rowArray)
{
    for (var i = 0; i < rowArray.length; i++)
    {
        var row = rowArray[i];
        for(var j = 0; j < GAME_AREA_WIDTH; j++)
        {
            setBitMapInfo(row,j,-1);
//                    alert(row);
        }
    }
    gameRedraw();
    setTimeout(disppearRestart,100);
}
function disppearRestart()
{
    var copyFrom = GAME_AREA_HEIGHT - 1;
    for (var i = GAME_AREA_HEIGHT - 1; i >= 0; i--)
    {
        while(copyFrom >= 0 && getBitMapInfo(copyFrom,0) == -1)
        {
            --copyFrom;
        }


        for (var j = 0; j < GAME_AREA_WIDTH; j++)
        {
            var copyValue = 0;
            if (copyFrom >= 0 )
            {
                copyValue = getBitMapInfo(copyFrom,j);
            }
            setBitMapInfo(i,j,copyValue);
        }
        --copyFrom;
    }
    getNextBlock();
    fFalling = true;
    gameRedraw();
}


//End
var fMouseInEndButton;
function gameEnd()
{
    window.clearInterval(fallingCycleTag);
    fMouseInEndButton = false;
    fallingCycleTag = null;
    window.removeEventListener('keydown',handleKeyDown);
    drawEndScene();
}



function drawEndScene()
{
    main_context.fillStyle = "rgb(0,0,0)";
    main_context.strokeStyle = "rgb(0,0,0)";

    main_context.textAlign = "center";

    main_context.fillRect(0,0,MAIN_CONTEXT_WIDTH,MAIN_CONTEXT_HEIGHT);

    main_context.font = "italic 50px sans-serif";
    main_context.fillStyle = "rgb(255,255,255)";
    main_context.strokeStyle = "rgb(255,255,255)";
    main_context.fillText('Game Over',MAIN_CONTEXT_WIDTH/2 - 10,MAIN_CONTEXT_HEIGHT/2 - 80);

    main_context.font = "italic 30px sans-serif";
    main_context.fillText("Your Score",MAIN_CONTEXT_WIDTH / 2, MAIN_CONTEXT_HEIGHT/2);

    main_context.fillText(currentScore,MAIN_CONTEXT_WIDTH / 2, MAIN_CONTEXT_HEIGHT/2 + 30);

    if (fMouseInEndButton)
    {
        main_context.fillStyle = "rgb(0,0,255)";
        main_context.strokeStyle = "rgb(0,0,255)";
    }
    else
    {
        main_context.fillStyle = "rgb(255,255,255)";
        main_context.strokeStyle = "rgb(255,255,255)";
    }

    main_context.fillText("Click Here To",MAIN_CONTEXT_WIDTH / 2, MAIN_CONTEXT_HEIGHT/2 + 80);
    main_context.fillText("Upload Your Score",MAIN_CONTEXT_WIDTH / 2, MAIN_CONTEXT_HEIGHT/2 + 105);

    main_canvas.addEventListener("mousemove",endSceneMouseMove);
    main_canvas.addEventListener("mouseup",endSceneMouseUp);
//            main_canvas.removeEventListener("mousemove",startMouseMoveDetect);
//            main_canvas.removeEventListener("mouseup",startMouseUpDetect);
}
function endSceneMouseUp(ev)
{
//            var mouseX, mouseY;
    if (ev.layerX || ev.layerX == 0)
    {
        mouseX = ev.layerX;
        mouseY = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0)
    {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }
    if (endClickRectDetect(mouseX,mouseY))
    {
        main_canvas.removeEventListener("mousemove",endSceneMouseMove);
        main_canvas.removeEventListener("mouseup",endSceneMouseUp);
        SignSceneInit();
    }

}
function endSceneMouseMove(ev)
{
    var mouseX, mouseY;
    if (ev.layerX || ev.layerX == 0)
    {
        mouseX = ev.layerX;
        mouseY = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0)
    {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }
    if (endClickRectDetect(mouseX,mouseY))
    {
        fMouseInEndButton = true;
    }
    else
    {
        fMouseInEndButton = false;
    }
    drawEndScene();
}

function endClickRectDetect(x,y)
{
    var distanceX = x - MAIN_CONTEXT_WIDTH / 2;
    var distanceY = y - (MAIN_CONTEXT_HEIGHT / 2 + 92.5);
    if (distanceX < 50 && distanceX > -50 && distanceY < 25 && distanceY > -25)
    {
        return true;
    }
    else
    {
        return false;
    }
}


//Sign Scene
function SignSceneInit()
{
    main_context.fillStyle = "rgb(0,0,0)";
    main_context.strokeStyle = "rgb(0,0,0)";

    main_context.fillRect(0,0,MAIN_CONTEXT_WIDTH,MAIN_CONTEXT_HEIGHT);
    main_context.clearRect(100,100,200,100);

    main_context.fillStyle = "rgb(255,255,255)";
    main_context.strokeStyle = "rgb(255,255,255)";

    main_context.fillText("Sign Below",MAIN_CONTEXT_WIDTH/2,MAIN_CONTEXT_HEIGHT / 2 - 130);

    main_canvas.addEventListener('mousedown',beginDraw,false);
    main_canvas.addEventListener('mousemove',drawing,false);
    main_canvas.addEventListener('mouseup',endDraw,false);

    main_canvas.addEventListener('mousemove',signCommitButtonMouseMove,false);
    main_canvas.addEventListener('mouseup',signCommitButtonMouseUp,false);

    sign_context.clearRect(0,0,200,100);

    drawCommitText(false);
}
function drawCommitText(fHighlight)
{
    main_context.fillStyle = "rgb(0,0,0)";
    main_context.strokeStyle = "rgb(0,0,0)";
    main_context.fillRect(0,MAIN_CONTEXT_HEIGHT / 2 + 50, MAIN_CONTEXT_WIDTH, MAIN_CONTEXT_HEIGHT / 2 - 50);

    if (fHighlight)
    {
        main_context.fillStyle = "rgb(0,0,255)";
        main_context.strokeStyle = "rgb(0,0,255)";
    }
    else
    {
        main_context.fillStyle = "rgb(255,255,255)";
        main_context.strokeStyle = "rgb(255,255,255)";
    }
    main_context.fillText("Commit And Restart",MAIN_CONTEXT_WIDTH / 2, MAIN_CONTEXT_HEIGHT / 2 + 100);
    main_context.fillStyle = "rgb(0,0,0)";
    main_context.strokeStyle = "rgb(0,0,0)";
}

function signCommitButtonDetect(x,y)
{
    var distanceX = MAIN_CONTEXT_WIDTH / 2 - x;
    var distanceY = MAIN_CONTEXT_HEIGHT / 2 + 100 - y;
    if (distanceX < 130 && distanceX > - 130 && distanceY < 15 && distanceY > -15)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function signCommitButtonMouseMove(ev)
{
    var mouseX, mouseY;
    if (ev.layerX || ev.layerX == 0)
    {
        mouseX = ev.layerX;
        mouseY = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0)
    {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }
    drawCommitText(signCommitButtonDetect(mouseX,mouseY));
}
function signCommitButtonMouseUp(ev)
{
    var mouseX, mouseY;
    if (ev.layerX || ev.layerX == 0)
    {
        mouseX = ev.layerX;
        mouseY = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0)
    {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }

    if (signCommitButtonDetect(mouseX,mouseY))
    {
        main_canvas.removeEventListener('mousedown',beginDraw,false);
        main_canvas.removeEventListener('mousemove',drawing,false);
        main_canvas.removeEventListener('mouseup',endDraw,false);

        main_canvas.removeEventListener('mousemove',signCommitButtonMouseMove,false);
        main_canvas.removeEventListener('mouseup',signCommitButtonMouseUp,false);


        var data = sign_canvas.toDataURL();
        var base64 = data.substring(22);

        $.post('upload.php',{'sign':base64, 'score':currentScore});

        //Restart
        init();

    }
}


//Draw Sign
var drawMouseX;
var drawMouseY;
var fSignDraw;
function beginDraw(ev)
{
    fSignDraw = true;
    if (ev.layerX || ev.layerX == 0)
    {
        drawMouseX = ev.layerX;
        drawMouseY = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0)
    {
        drawMouseX = ev.offsetX;
        drawMouseY = ev.offsetY;
    }
    else
    {
        fSignDraw = false;
    }
}
function drawing(ev)
{

    if (fSignDraw)
    {
        var newMouseX;
        var newMouseY;
        if (ev.layerX || ev.layerX == 0)
        {
            newMouseX = ev.layerX;
            newMouseY = ev.layerY;
        }
        else if (ev.offsetX || ev.offsetX == 0)
        {
            newMouseX = ev.offsetX;
            newMouseY = ev.offsetY;
        }

        if (drawMouseX < 300 && drawMouseX > 100 && drawMouseY < 200 && drawMouseY > 100)
        {
            main_context.fillStyle = "rgb(0,0,0)";
            main_context.strokeStyle = "rgb(0,0,0)";
            main_context.lineWidth = 4;
            main_context.beginPath();
            main_context.moveTo(drawMouseX, drawMouseY);
            main_context.lineTo(newMouseX, newMouseY);
            main_context.stroke();

            sign_context.fillStyle = "rgb(0,0,0)";
            sign_context.strokeStyle = "rgb(0,0,0)";
            sign_context.lineWidth = 4;
            sign_context.beginPath();
            sign_context.moveTo(drawMouseX - 100, drawMouseY - 100);
            sign_context.lineTo(newMouseX - 100, newMouseY - 100);
            sign_context.stroke();
        }
        drawMouseX = newMouseX;
        drawMouseY = newMouseY;
    }
}
function endDraw(ev)
{
    fSignDraw = false;
}

