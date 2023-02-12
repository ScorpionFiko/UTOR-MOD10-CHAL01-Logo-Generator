const Style = require('./style.js');

class Text extends Style {
    constructor(logo) {
        super();
        if (logo === undefined || logo.length > 3 || logo.length == 0 ) {
            throw new Error ('The logo must be a maximum of 3 characters')
        }
        this.text = logo;
    }
    


    render() {

        return `<text ${this.renderStyle(this.style)}>${this.text}</text>`;
    }
}

module.exports = Text;