/**
 * Implementation of the Canvas Arc
 * Added the ability to use degress (default) or radians
 */
enyo.kind({
	name: "tld.Shape2D.Arc",
	kind: "enyo.canvas.Shape",
    lineWidth: 1,
    outlineColor: "black",
    color: "",
    lineCap: "butt", // butt, square, round
    x: 0, 
    y: 0, 
    radius: 10, 
    useDegrees: true,
    startAngle: 0, 
    endAngle: 90,  
    antiClockwise: true,
    //* @protected
    renderSelf: function(ctx) {
        ctx.beginPath();
        ctx.lineCap = this.lineCap;
        ctx.lineWidth= this.lineWidth;
        ctx.antiClockwise = this.antiClockwise;
        var startAngle = this.startAngle;
        var endAngle = this.endAngle;
        if (this.useDegrees) {
            startAngle = this.startAngle * Math.PI/180;
            endAngle = this.endAngle * Math.PI/180;
        }
        ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, this.antiClockwise);
        this.draw(ctx);
    }
});

/*
Example:
http://jsfiddle.net/pcimino/2P9AU/

enyo.kind({
    name: "App",
    kind: "Canvas",
    attributes: {
        width: 800,
        height: 800
    },
    components: [
        {name: "canvasSpace",
        kind: "canvas.Control",
        components: [
            {name: "arc1", kind: "tld.Shape2D.Arc", startAngle: 0, endAngle:140, radius: 60, x: 100, y: 400, outlineColor:"red", lineCap :"round", antiClockwise:true},
            {name: "arc2", kind: "tld.Shape2D.Arc", startAngle: 45, endAngle:90, radius: 60, x: 100, y: 400,outlineColor:"green", lineWidth:10, antiClockwise:false},
            {name: "arc3", kind: "tld.Shape2D.Arc", startAngle: 90, endAngle:0, radius: 60, x: 300, y: 200,outlineColor:"blue", lineWidth:10, antiClockwise:true},
            {name: "arc4", kind: "tld.Shape2D.Arc", startAngle: 180, endAngle:90, radius: 60, x: 420, y: 200,outlineColor:"purple", lineWidth:10, antiClockwise:true}
        ]}
    ]
});

new App().renderInto(document.body);?
*/

