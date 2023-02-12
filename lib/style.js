class Style {


}

Style.prototype.addStyle = function(styleObject = {}) {
    if (styleObject === undefined ||
        typeof styleObject !== 'object' ) {
        throw new Error ('The style must be presented in a "key: value" pair(s).');
    }
    this.style = styleObject;
}

Style.prototype.renderStyle = function(styleObject ={}) {
    if (styleObject === undefined ||
        typeof styleObject !== 'object' ) {
        throw new Error ('The style must be presented in a "key: value" pair(s).');
    }
    let textStyle = `style="`;
        for (const style in styleObject) {
            textStyle += `${style}:${styleObject[style]};`
        }
        textStyle += `"`;
        return textStyle;
}

module.exports = Style;