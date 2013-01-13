/**
 * Canvas implementation of poly line, can be used to create an open shape or a closed polygon
 * for polygon use closePath:true
 * To fill polygon use fill:true;
 */
enyo.kind({
    name: "tld.Shape2D.PolyLine",
    kind: "enyo.canvas.Shape",
    lineCap: "butt", // butt, square, round
    xPoints: [0,10,10,0],
    yPoints: [0,0,10,10],
    lineWidth: 10,
    outlineColor: "black",
    color: "",
    closePathFlag: true,
    fillFlag: true,
    //* @protected
    renderSelf: function(ctx) {
        ctx.beginPath();
        // What other properties need to be explicitly set?
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = this.lineCap;
        ctx.moveTo(this.xPoints[0], this.yPoints[0]); // sets the start point

        var i = 1;
        for (i = 1; i < this.xPoints.length; i++) {
            ctx.lineTo(this.xPoints[i], this.yPoints[i]); // move to these coordinates
        }

        if (this.closePathFlag) {
            ctx.closePath();
            if (this.fillFlag) ctx.fill();
        }
        this.draw(ctx);
    }
});
/*
Example
http://jsfiddle.net/pcimino/ssax7/


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
            {name: "poly1", kind: "tld.Shape2D.PolyLine", xPoints:[100,200,350], yPoints:[250,350,300], outlineColor:"red", color:"blue"},
            {name: "poly2", kind: "tld.Shape2D.PolyLine", xPoints:[300,500,650], yPoints:[250,350,300], outlineColor:"red", closePathFlag:false}

        ]}
    ]
});

new App().renderInto(document.body);?
*/