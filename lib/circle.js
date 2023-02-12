const Style = require('./style.js');

class Circle extends Style {
    constructor(diameter) {
        super();
        if (diameter === undefined ||
            typeof diameter !== 'number' ||
            diameter > 200 || diameter < 1) {
            throw new Error('The circle diameter must be between 1 and 200');
        }
        this.radius = diameter / 2;

    }

    render() {
        return `<circle r=${this.radius} ${this.renderStyle(this.style)} />`;
    }
}

module.exports = Circle;