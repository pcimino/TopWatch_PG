/**
 * Draws a line given a start point, distance and angle
 * the startDistance is 0 if you want to draw the entire length
 * greater than zero if you want the line to start some distance from the point of origin
 * Angle 0 is at 3 o'clock, for Canvas, angles move clockwise, default for this shape obj is antiClockwise true
 */
enyo.kind({
	name: "tld.Shape2D.Vector",
	kind: enyo.canvas.Shape,
    lineCap: "butt", // butt, square, round
    angle: 0,
    useDegrees: true,
    antiClockwise: true,
    startPoint: {
        x: 0,
        y: 0
    },
    startDistance: 0,
    endDistance: 100,
    lineWidth: 10,
    outlineColor: "black",
    color: "",
    //* @protected
    renderSelf: function(ctx) {
        ctx.beginPath();
        // What other properties need to be explicitly set?
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = this.lineCap;
        
        var angle = this.angle;
        if (this.useDegrees) {
            // convert the input degress to radians
            angle = this.angle * Math.PI / 180;
        }
        if (this.antiClockwise) {
            angle = (2 * Math.PI) - angle;
        }
        var slope = Math.tan(angle);
        // cheat to estimate vertical lines
        if (slope > 90000000000) {
            slope = 90000000000;
        }
        var bConst = this.startPoint.y - (slope * this.startPoint.x);
        var xSign = Math.cos(angle) / Math.abs(Math.cos(angle));
        var newX = this.startPoint.x + (this.endDistance / (xSign * Math.sqrt(1 + Math.pow(slope, 2))));
        var newY = (slope * newX) + bConst;


        var startX = this.startPoint.x;
        var startY = this.startPoint.y;
        // check if line starts at some point along the vector
        if (this.startDistance > 0) {
            startX = this.startPoint.x + (this.startDistance / (xSign * Math.sqrt(1 + Math.pow(slope , 2))));
            startY = (slope * startX) + bConst;
        }
        ctx.moveTo(startX, startY); // sets the start point
        ctx.lineTo(newX, newY); // move to these coordinates
        this.draw(ctx);
    }
});

/*
Example
http://jsfiddle.net/pcimino/VW2QV/

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
            {name: "vect1", kind: "tld.Shape2D.Vector", angle: 0, startPoint:{x: 100, y: 200}, endDistance: 100, outlineColor:"red", lineCap :"round"},
            {name: "vect1", kind: "tld.Shape2D.Vector", angle: 30, startPoint:{x: 100, y: 200}, endDistance: 100, outlineColor:"blue", lineCap :"round"},
            {name: "vect1", kind: "tld.Shape2D.Vector", angle: 60, startPoint:{x: 100, y: 200}, endDistance: 100, outlineColor:"purple", lineCap :"round"},
            
            // Ticks around a clock
            {name: "vect2", kind: "tld.Shape2D.Vector", angle: 0, startPoint:{x: 400, y: 500}, startDistance: 100, endDistance:200, outlineColor:"green", lineWidth:10},
            {name: "vect2", kind: "tld.Shape2D.Vector", angle: 18, startPoint:{x: 400, y: 500}, startDistance: 100, endDistance:200, outlineColor:"green", lineWidth:10},
            {name: "vect2", kind: "tld.Shape2D.Vector", angle: 36, startPoint:{x: 400, y: 500}, startDistance: 100, endDistance:200, outlineColor:"green", lineWidth:10},
            {name: "vect2", kind: "tld.Shape2D.Vector", angle: 54, startPoint:{x: 400, y: 500}, startDistance: 100, endDistance:200, outlineColor:"green", lineWidth:10},
            {name: "vect2", kind: "tld.Shape2D.Vector", angle: 72, startPoint:{x: 400, y: 500}, startDistance: 100, endDistance:200, outlineColor:"green", lineWidth:10},
            {name: "vect2", kind: "tld.Shape2D.Vector", angle: 90, startPoint:{x: 400, y: 500}, startDistance: 100, endDistance:200, outlineColor:"green", lineWidth:10}
        ]}
    ]
});

new App().renderInto(document.body);?
*/