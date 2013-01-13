/**
 * TODO For some reason, can't seem to draw anything unless close() and fill() are used
 * also colors are not being recognized
 *
 * Canvas implementation of poly path, can be used to create an open shape or a closed shape
 * for closed use closePath:true
 * To fill shapeuse fill:true;
 * uses quadratic curve by default, can set bezierFlag
 */
enyo.kind({
    name: "tld.Shape2D.PolyCurve",
    kind: "enyo.canvas.Shape",
    lineCap: "butt", // butt, square, round
    xPoints: [0,10,20,30],
    yPoints: [0,10,40,120],
    lineWidth: 10,
    outlineColor: "red",
    color: "blue",
    closePathFlag: true,
    fillFlag: true,
    bezierFlag: false,
    //* @protected
    renderSelf: function(ctx) {
        ctx.beginPath();

        // none of these seem to be recognized
        ctx.strokeStyle = this.outlineColor;
        ctx.strokeWidth = this.lineWidth;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = this.lineCap;
        ctx.color = this.color;
        ctx.outlineColor = this.outlineColor;
        
        // start the line
        ctx.moveTo(this.xPoints[0], this.yPoints[0]); // sets the start point

        var i = 1;
        var increment = 2;
        if (this.bezierFlag) increment = 3;
        var xLen= this.xPoints.length;
        for (i = 1; i < xLen - increment ; i += increment) {
            if (this.bezierFlag) {
                ctx.bezierCurveTo(this.xPoints[i], this.yPoints[i], this.xPoints[i+1], this.yPoints[i+1], this.xPoints[i+2], this.yPoints[i+2]);
            } else {
                ctx.quadraticCurveTo(this.xPoints[i], this.yPoints[i], this.xPoints[i+1], this.yPoints[i+1]);
            }
        }
        // Finish up if we didn't use all the points
        var delta = xLen - i;
        if (delta == 3) {
            ctx.quadraticCurveTo(this.xPoints[i], this.yPoints[i], this.xPoints[i+1], this.yPoints[i+1]);
        } else if (delta  == 2) {
           ctx.lineTo(this.xPoints[i], this.yPoints[i]);
        }
        
        if (this.closePathFlag) {
            ctx.closePath();
            if (this.fillFlag) ctx.fill();
        }
        this.stroke(ctx);
    }
});

/*

Example
http://jsfiddle.net/pcimino/9Qftb/
  
enyo.kind({
    name: "App",
    kind: "Canvas",
    attributes: {
        width: 800,
        height: 600
    },
    components: [
        {name: "canvasSpace",
        kind: "canvas.Control",
        components: [
            {name: "poly1", kind: "tld.Shape2D.PolyCurve", xPoints:[100,200,250,270,340,350,400,500,600,700,750,775,780,800], yPoints:[250,350,300,350,200,100,200,300,200,100,200,180,190,195]}

        ]}
    ]
});

new App().renderInto(document.body);?
*/