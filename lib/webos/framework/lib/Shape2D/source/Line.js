/**
 * Canvas implementation of Line
 */
enyo.kind({
	name: "tld.Shape2D.Line",
	kind: enyo.canvas.Shape,
    lineCap: "butt", // butt, square, round
    startPoint: {
        x: 580,
        y: 470
    },
    endPoint: {
        x: 70,
        y: 190
    },
    lineWidth: 10,
    outlineColor: "black",
    color: "",
    //* @protected
    renderSelf: function(ctx) {
        ctx.beginPath();
        // This shouldn't be necessary but doesn't change the thickness with or without this line
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = this.lineCap;
        
        ctx.moveTo(this.startPoint.x, this.startPoint.y); // sets the start point
        ctx.lineTo(this.endPoint.x, this.endPoint.y); // move to these coordinates
        this.draw(ctx);
    }
});

/*
Example
http://jsfiddle.net/pcimino/uLmZG/

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
            {name: "line1", kind: "tld.Shape2D.Line", outlineColor:"red", lineCap :"round"},
            {name: "line2", kind: "tld.Shape2D.Line", startPoint:{x: 100, y: 400}, endPoint:{x: 200, y: 200},outlineColor:"green", lineWidth:10}
        ]}
    ]
});

new App().renderInto(document.body);?

*/
