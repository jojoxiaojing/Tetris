var BLOCK_SIZE = 20;


function getRandomBlock()
{
    var color = parseInt(Math.random() * 7 + 1);
    var blockNumber = parseInt(Math.random() * 7);
    return getNewBlock(blockNumber, color);
}

function getNewBlock(blockNumber, color)
{
    var block = null;
    switch (blockNumber)
    {
        case 0:
            block = new Block0(color);
            break;
        case 1:
            block = new Block1(color);
            break;
        case 2:
            block = new Block2(color);
            break;
        case 3:
            block = new Block3(color);
            break;
        case 4:
            block = new Block4(color);
            break;
        case 5:
            block = new Block5(color);
            break;
        case 6:
            block = new Block6(color);
            break;
    }
    return block;
}

function drawBlock(x,y,block,context)
{
    if (block == null)
    {
        return;
    }
    var imgName = getColorImage(block.color);

    for (var i = 0; i < block.points.length; i++)
    {
        var point = block.points[i];
        preBlockImage(imgName,point,x,y,context);
    }
}

function preBlockImage(url,point,x,y,context)
{
    var img = new Image();
    img.src = url;
    var bx = point.x;
    var by = point.y;

    if (img.complete)
    {
        context.drawImage(img,x + BLOCK_SIZE * bx, y + BLOCK_SIZE * by, BLOCK_SIZE, BLOCK_SIZE);
        return;
    }
    img.onload = function()
    {

        context.drawImage(img,x + BLOCK_SIZE * bx, y + BLOCK_SIZE * by, BLOCK_SIZE, BLOCK_SIZE);
    };
}

/////////////////////////////
//Block Edge
function getBlockLeft(block)
{
    var left = 0;
    for (var i = 0; i < block.points.length; i++)
    {
        if (block.points[i].x < left)
        {
            left = block.points[i].x;
        }
    }
    return left;
}
function getBlockRight(block)
{
    var right = 0;
    for (var i = 0; i < block.points.length; i++)
    {
        if(block.points[i].x > right)
        {
            right = block.points[i].x;
        }
    }
    return right;
}
function getBlockTop(block)
{
    var top = 0;
    for (var i = 0; i < block.points.length; i++)
    {
        if (block.points[i].y < top)
        {
            top = block.points[i].y;
        }
    }
    return top;
}
function getBlockBottom(block)
{
    var bottom = 0;
    for (var i = 0; i < block.points.length; i++)
    {
        if (block.points[i].y > bottom)
        {
            bottom = block.points[i].y;
        }
    }
    return bottom;
}
////////////////////////

function Point(x,y)
{
    this.x = x;
    this.y = y;
}

function getColorImage(color)
{
    return "img/block_color_" + color + ".png";
}


///////////////////////////////////
function Block0(color)                    // 00
{                                         //00
    this.color = color;
    this.points = [new Point(1,0), new Point(0,0), new Point(0,1), new Point(-1,1)];
    this.state = 0;
}
Block0.prototype =
{
    constructor:Block0,
    rotate:
        function()
        {
            if (this.state == 0)
            {
                this.setState(1);
            }
            else
            {
                this.setState(0);
            }
        },
    rotateBack:
        function()
        {
            this.rotate();
        },
    setState:
        function(state)
        {
            this.state = state;
            if (this.state == 0)
            {
                // 00
                //00
                this.points[0].x = 1;
                this.points[0].y = 0;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = -1;
                this.points[3].y = 1;
            }
            else
            {
                //1
                //11
                // 1
                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 1;
                this.points[3].y = 1;
            }
        }
};

///////////////////////////////////
function Block1(color)      //00
{                           //00
    this.color = color;
    this.points = [new Point(0,0), new Point(1,0), new Point(0,1), new Point(1,1)];
    this.state = 0;
}
Block1.prototype =
{
    constructor: Block1,
    rotate:
        function()
        {
            return; //正方形方块不用旋转
        },
    rotateBack:
        function()
        {
            return;
        }
};

///////////////////////////////////
function Block2(color)      //00
{                           // 00
    this.color = color;
    this.points = [new Point(-1,0), new Point(0,0), new Point(0,1), new Point(1,1)];
    this.state = 0;
}
Block2.prototype =
{
    constructor: Block2,
    rotate:
        function()
        {
            if(this.state == 0)
            {
                this.setState(1);
            }
            else
            {
                this.setState(0);
            }
        },
    rotateBack:
        function()
        {
            this.rotate();
        },
    setState:
        function(state)
        {
            this.state = state;
            if (this.state == 0)
            {
                //00
                // 00
                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = 1;
                this.points[3].y = 1;

            }
            else
            {
                // 1
                //11
                //1
                this.points[0].x = 0;
                this.points[0].y = 1;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 1;
                this.points[3].y = -1;
            }
        }

};

///////////////////////////////////
function Block3(color)      //000
{                           //  0
    this.color = color;
    this.points = [new Point(-1,0), new Point(0,0), new Point(1,0), new Point(1,1)];
    this.state = 0;
}
Block3.prototype =
{
    constructor:Block3,
    rotate:
        function()
        {
            if (this.state == 3)
            {
                this.setState(0);
            }
            else
            {
                this.setState(this.state + 1);
            }
        },
    rotateBack:
        function()
        {
            if (this.state == 0)
            {
                this.setState(3);
            }
            else
            {
                this.setState(this.state - 1);
            }

        },
    setState:
        function(state)
        {
            this.state = state;
            if (this.state == 0)
            {
                //000
                //  0
                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 1;
                this.points[3].y = 1;
            }
            else if (this.state == 1)
            {
                // 1
                // 1
                //11
                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = -1;
                this.points[3].y = 1;

            }
            else if (this.state == 2)
            {
                //2
                //222
                this.points[0].x = 1;
                this.points[0].y = 0;
                this.points[2].x = -1;
                this.points[2].y = 0;
                this.points[3].x = -1;
                this.points[3].y = -1;
            }
            else
            {
                //33
                //3
                //3
                this.points[0].x = 0;
                this.points[0].y = 1;
                this.points[2].x = 0;
                this.points[2].y = -1;
                this.points[3].x = 1;
                this.points[3].y = -1;

            }
        }

};


function Block4(color)              //0000
{
    this.color = color;
    this.points = [new Point(-1,0), new Point(0,0), new Point(1,0), new Point(2,0)];
    this.state = 0;
}
Block4.prototype =
{
    constructor:Block4,
    rotate:
        function()
        {
            if (this.state == 0)
            {
                this.setState(1);
            }
            else
            {
                this.setState(0);
            }
        },
    rotateBack:
        function()
        {
            this.rotate();
        },
    setState:
        function(state)
        {
            this.state = state;
            if(this.state == 0)
            {
                //0000
                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 2;
                this.points[3].y = 0;
            }
            else
            {
                //1
                //1
                //1
                //1
                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = 0;
                this.points[3].y = 2;
            }
        }
};



///////////////////////////////////
function Block5(color)           //000
{                                // 0
    this.color = color;
    this.points = [new Point(-1,0), new Point(0,0), new Point(1, 0), new Point(0,1)];
    this.state = 0;
}
Block5.prototype =
{
    constructor: Block5,
    rotate:
        function()
        {
            if (this.state == 3)
            {
                this.setState(0);
            }
            else
            {
                this.setState(this.state + 1);
            }
        },
    rotateBack:
        function()
        {
            if (this.state == 0)
            {
                this.setState(3);
            }
            else
            {
                this.setState(this.state - 1);
            }
        },
    setState:
        function(state)
        {
            this.state = state;
            if(this.state == 0)
            {
                //000
                // 0
                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 0;
                this.points[3].y = 1;
            }
            else if (this.state == 1)
            {
                // 1
                //11
                // 1
                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = -1;
                this.points[3].y = 0;
            }
            else if (this.state == 2)
            {
                // 2
                //222
                this.points[0].x = 1;
                this.points[0].y = 0;
                this.points[2].x = -1;
                this.points[2].y = 0;
                this.points[3].x = 0;
                this.points[3].y = -1;
            }
            else
            {
                //3
                //33
                //3
                this.points[0].x = 0;
                this.points[0].y = 1;
                this.points[2].x = 0;
                this.points[2].y = -1;
                this.points[3].x = 1;
                this.points[3].y = 0;
            }
        }
};

///////////////////////////////////
function Block6(color)           //000
{                                //0
    this.color = color;
    this.points = [new Point(1,0), new Point(0,0),new Point(-1,0), new Point(-1, 1)];
    this.state = 0;
}
Block6.prototype =
{
    constructor: Block6,
    rotate:
        function()
        {
            if (this.state == 3)
            {
                this.setState(0);
            }
            else
            {
                this.setState(this.state + 1);
            }
        },
    rotateBack:
         function()
         {
             if (this.state == 0)
             {
                 this.setState(3);
             }
             else
             {
                 this.setState(this.state - 1);
             }

         },
    setState:
        function(state)
        {
            this.state = state;
            if(this.state == 0)
            {
                //000
                //0
                this.points[0].x = 1;
                this.points[0].y = 0;
                this.points[2].x = -1;
                this.points[2].y = 0;
                this.points[3].x = -1;
                this.points[3].y = 1;
            }
            else if (this.state == 1)
            {
                //11
                // 1
                // 1
                this.points[0].x = 0;
                this.points[0].y = 1;
                this.points[2].x = 0;
                this.points[2].y = -1;
                this.points[3].x = -1;
                this.points[3].y = -1;
            }
            else if (this.state == 2)
            {
                //  2
                //222
                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 1;
                this.points[3].y = -1;
            }
            else if (this.state == 3)
            {
                //3
                //3
                //33
                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = 1;
                this.points[3].y = 1;
            }
        }
};

///////////////////////////////////
