const Text = require("./text.js");
const Style = require("./style.js");
const Square = require("./square.js");
const Circle = require("./circle.js");
const Triangle = require("./triangle.js");

class SVG extends Style {
    constructor({viewBoxStartX = -150,
        viewBoxStartY = -100,
        viewBoxWidth = 300,
        viewBoxHeight = 200, logoText, logoShape}) {
            super();
            this.viewBoxX = viewBoxStartX;
            this.viewBoxY = viewBoxStartY;
            this.viewBoxWidth = viewBoxWidth;
            this.viewBoxHeight = viewBoxHeight;
            this.xmlns = "http://www.w3.org/2000/svg";
            
            if (!(logoText instanceof Text) || 
                !((logoShape instanceof Square) ||
                (logoShape instanceof Circle) ||
                (logoShape instanceof Triangle))) {
                throw new Error ('There is a problem with one of the inputs supplied.')
            }
            this.logoText = logoText.render();
            this.logoShape = logoShape.render();
        }

    render() {
        let viewBox = `viewBox="${this.viewBoxX} ${this.viewBoxY} ${this.viewBoxWidth} ${this.viewBoxHeight}" xmlns="${this.xmlns}"`;

        return `<svg ${viewBox} ${this.renderStyle(this.style)}>\n${this.logoShape}\n${this.logoText}</svg>`;
    }
}

module.exports = SVG;