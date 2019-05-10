var BLOCK_SIZE = 20;

function getNewBlock()
{
    var block = null;
    parseInt(Math.random() * 7);

}

function drawBlock(x,y,block)
{
    var imgName = getColorImage(block.color);
    ///////未完
}

function Point(x,y)
{
    this.x = x;
    this.y = y;
}

function getColorImage(color)
{
    return "img/block" + color + ".png";
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
            if (this.state == 0)        // 00
            {                           //00
                this.state = 1;

                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 1;
                this.points[3].y = 1;
            }
            else                        //1
            {                           //11
                this.state = 0;         // 1

                this.points[0].x = 1;
                this.points[0].y = 0;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = -1;
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
            if(this.state == 0)         //00
            {                           // 00
                this.state = 1;

                this.points[0].x = 0;
                this.points[0].y = 1;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 1;
                this.points[3].y = -1;
            }
            else                        // 1
            {                           //11
                this.state = 0;         //1

                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = 1;
                this.points[3].y = 1;
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
            if(this.state == 0)     //000
            {                       //  0
                this.state = 1;

                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = -1;
                this.points[3].y = 1;
            }
            else if (this.state == 1)   // 1
            {                           // 1
                this.state = 2;         //11

                this.points[0].x = 1;
                this.points[0].y = 0;
                this.points[2].x = -1;
                this.points[2].y = 0;
                this.points[3].x = -1;
                this.points[3].y = -1;
            }
            else if (this.state == 2)   //2
            {                           //222
                this.state = 3;

                this.points[0].x = 0;
                this.points[0].y = 1;
                this.points[2].x = 0;
                this.points[2].y = -1;
                this.points[3].x = 1;
                this.points[3].y = -1;
            }
            else if (this.state == 3)   //33
            {                           //3
                this.state = 0;         //3

                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 1;
                this.points[3].y = 1;
            }
        }

};


///////////////////////////////////
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
            if (this.state == 0)      //0000
            {
                this.state = 1;

                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = 0;
                this.points[3].y = 2;
            }
            else                      //1
            {                         //1
                this.state = 0;       //1
                //1
                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 2;
                this.points[3].y = 0;
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
            if (this.state == 0)              //000
            {                                 // 0
                this.state = 1;

                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = -1;
                this.points[3].y = 0;
            }
            else if (this.state == 1)         // 1
            {                                 //11
                this.state = 2;               // 1

                this.points[0].x = 1;
                this.points[0].y = 0;
                this.points[2].x = -1;
                this.points[2].y = 0;
                this.points[3].x = 0;
                this.points[3].y = -1;
            }
            else if (this.state == 2)         // 2
            {                                 //222
                this.state = 3;

                this.points[0].x = 0;
                this.points[0].y = 1;
                this.points[2].x = 0;
                this.points[2].y = -1;
                this.points[3].x = 1;
                this.points[3].y = 0;
            }
            else                              //3
            {                                 //33
                this.state = 0;               //3

                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 0;
                this.points[3].y = 1;
            }
        }
};

///////////////////////////////////
function Block6(color)           //000
{                                //0
    this.color = color;
    this.points = [new Point(1,0), new Point(-1,0), new Point(-1, 1)];
    this.state = 0;
}
Block6.prototype =
{
    constructor: Block6,
    rotate:
        function()
        {
            if (this.state == 0)         //000
            {                            //0
                this.state = 1;

                this.points[0].x = 0;
                this.points[0].y = 1;
                this.points[2].x = 0;
                this.points[2].y = -1;
                this.points[3].x = -1;
                this.points[3].y = -1;
            }
            else if (this.state == 1)    //11
            {                            // 1
                this.state = 2;          // 1

                this.points[0].x = -1;
                this.points[0].y = 0;
                this.points[2].x = 1;
                this.points[2].y = 0;
                this.points[3].x = 1;
                this.points[3].y = -1;
            }
            else if (this.state == 2)   //  2
            {                           //222
                this.state = 3;

                this.points[0].x = 0;
                this.points[0].y = -1;
                this.points[2].x = 0;
                this.points[2].y = 1;
                this.points[3].x = 1;
                this.points[3].y = 1;
            }
            else if (this.state == 3)   //3
            {                           //3
                this.state = 0;         //33

                this.points[0].x = 1;
                this.points[0].y = 0;
                this.points[2].x = -1;
                this.points[2].y = 0;
                this.points[3].x = -1;
                this.points[3].y = 1;
            }
        }

};

///////////////////////////////////
