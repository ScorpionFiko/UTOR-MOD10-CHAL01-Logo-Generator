const Style = require('./style.js');

class Square extends Style {
    constructor(width) {
        super();
        if (width === undefined ||
            typeof width !== 'number' ||
            width > 200 || width < 1) {
            throw new Error('The square width must be between 1 and 200');
        }
        this.width = width;
        this.height = width;
        this.originX = 0 - width / 2;
        this.originY = 0 - width / 2;
    }

    render() {

        return `<rect x="${this.originX}" y="${this.originY}" width="${this.width}" height="${this.height}" ${this.renderStyle(this.style)} />`;
    }
}

module.exports = Square;