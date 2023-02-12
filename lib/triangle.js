const Style = require('./style.js');

class Triangle extends Style {
    constructor(sideWidth) {
        super();
        if (sideWidth === undefined ||
            typeof sideWidth !== 'number' ||
            sideWidth > 200 || sideWidth < 1) {
            throw new Error('The Triangle side must be between 1 and 200');
        }
        this.sideWidth = sideWidth;
 
    }

    getCoordinates(){
        return `points="0, ${-(Math.sqrt(3)/4*this.sideWidth)} ${this.sideWidth/2}, ${(Math.sqrt(3)/4*this.sideWidth)} ${-(this.sideWidth/2)}, ${(Math.sqrt(3)/4*this.sideWidth)}"`;
    }

    render() {

        return `<polygon ${this.getCoordinates()} ${this.renderStyle(this.style)} />`;
    }
}

module.exports = Triangle;