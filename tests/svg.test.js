const SVG = require('../lib/svg.js');
const Text = require('../lib/text.js');
const Square = require('../lib/square.js');
const Circle = require('../lib/circle.js');
const Triangle = require('../lib/triangle.js');

describe('SVG class testing', () => {
    describe('Constructor testing', () => {
        describe('testing default values', () => {
            test('testing viewbox X start position', () => {
                const result = -150;
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Square(150);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
                expect(svgFile.viewBoxX).toBe(result);
            });
            test('testing viewbox Y start position', () => {
                const result = -100;
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Circle(100);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
                expect(svgFile.viewBoxY).toBe(result);
            });
            test('testing viewbox width', () => {
                const result = 300;
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Triangle(100);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
                expect(svgFile.viewBoxWidth).toBe(result);
            });
            test('testing viewbox width', () => {
                const result = 200;
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Square(100);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
                expect(svgFile.viewBoxHeight).toBe(result);
            });
            test('testing xml namespace which is hardcoded', () => {
                const result = "http://www.w3.org/2000/svg";
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Circle(100);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
                expect(svgFile.xmlns).toBe(result);
            });
        });
        describe('testing logoText', () => {
            test('testing the text display without supplying the Text object', () => {
                const result = 'There is a problem with one of the inputs supplied.';
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Triangle(100);
                expect(() => { new SVG({ logoShape: logoShape }) }).toThrow(result);
            });
            test('testing the text display with supplying the Text object', () => {
                const result = `<text style="">Ba</text>`;
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Square(100);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
                expect(svgFile.logoText).toBe(result);
            });

        });
        describe('testing logoShape', () => {
            test('testing the shape display without supplying the shape object', () => {
                const result = 'There is a problem with one of the inputs supplied.';
                // must include a text class object
                const logoText = new Text("Ba");
                expect(() => { new SVG({ logoText: logoText }) }).toThrow(result);
            });
            test('testing the shape with supplying the Square shape object', () => {
                const result = `<rect x=-50 y=-50 width=100 height=100 style="" />`;
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Square(100);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });;
                expect(svgFile.logoShape).toBe(result);
            });
            test('testing the shape with supplying the Circle shape object', () => {
                const result = `<circle r=50 style="" />`;
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Circle(50);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
                expect(svgFile.logoShape).toBe(result);
            });
            test('testing the shape with supplying the Triangle shape object', () => {
                const result = `<polygon points="0, -64.9519052838329 75, 64.9519052838329 -75, 64.9519052838329" style="" />`;
                // must include a text class object
                const logoText = new Text("Ba");
                const logoShape = new Triangle(150);
                const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
                expect(svgFile.logoShape).toBe(result);
            });

        });
    });
    describe('addStyle function testing', () => {
        test('adding style to the SVG; no styles for text or shape ', () => {
            const result = `{"background-color":"blue"}`;
            // must include a text class object
            const logoText = new Text("Ba");
            const logoShape = new Triangle(150);
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            svgFile.addStyle({ 'background-color': 'blue' })
            expect(JSON.stringify(svgFile.style)).toBe(result);
        });
        test('adding style to the SVG it should not interfere with adding style to the text; no styles the shape ', () => {
            const result = `{"background-color":"green"}`;
            // must include a text class object
            const logoText = new Text("Ba");
            logoText.addStyle({ 'fill': 'gray' })
            const logoShape = new Triangle(150);
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            svgFile.addStyle({ 'background-color': 'green' })
            expect(JSON.stringify(svgFile.style)).toBe(result);
        });
        test('adding style to the SVG it should not interfere with adding style to the shape; no styles the text ', () => {
            const result = `{"background-color":"cyan"}`;
            // must include a text class object
            const logoText = new Text("Ba");
            const logoShape = new Triangle(150);
            logoShape.addStyle({ 'stroke': 'white', 'stroke-width': '5' })
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            svgFile.addStyle({ 'background-color': 'cyan' })
            expect(JSON.stringify(svgFile.style)).toBe(result);
        });
        test('adding style to the SVG it should not interfere with adding style to the shape or the text ', () => {
            const result = `{"background-color":"magenta"}`;
            // must include a text class object
            const logoText = new Text("Ba");
            logoText.addStyle({ 'fill': 'gray' })
            const logoShape = new Triangle(150);
            logoShape.addStyle({ 'stroke': 'white', 'stroke-width': '5' })
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            svgFile.addStyle({ 'background-color': 'magenta' })
            expect(JSON.stringify(svgFile.style)).toBe(result);
        });
    });
    describe('render function testing', () => {
        test('rendering SVG without styles for the SVG, text, or shape', () => {
            const result = `<svg viewBox="-150 -100 300 200" xmlns="http://www.w3.org/2000/svg" style="">\n<rect x=-100 y=-100 width=200 height=200 style="" />\n<text style="">aBc</text></svg>`;
            const logoText = new Text('aBc');
            const logoShape = new Square(200);
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            expect(svgFile.render()).toBe(result)
        });
        test('rendering SVG with styles for the SVG, but no style for the text, or shape', () => {
            const result = `<svg viewBox="-150 -100 300 200" xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;">\n<rect x=-100 y=-100 width=200 height=200 style="" />\n<text style="">aBc</text></svg>`;
            const logoText = new Text('aBc');
            const logoShape = new Square(200);
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            svgFile.addStyle({ 'background-color': '#ffffff' })
            expect(svgFile.render()).toBe(result)
        });
        test('rendering SVG with styles for the the text, but no style for the SVG, or shape', () => {
            const result = `<svg viewBox="-150 -100 300 200" xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;">\n<circle r=98 style="" />\n<text style="fill:pink;">aBc</text></svg>`;
            const logoText = new Text('aBc');
            logoText.addStyle({ 'fill': 'pink' })
            const logoShape = new Circle(98);
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            svgFile.addStyle({ 'background-color': '#ffffff' })
            expect(svgFile.render()).toBe(result)
        });
        test('rendering SVG with styles for the the shape, but no style for the SVG, or text', () => {
            const result = `<svg viewBox="-150 -100 300 200" xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;">\n<rect x=-100 y=-100 width=200 height=200 style="stroke:green;" />\n<text style="">aBc</text></svg>`;
            const logoText = new Text('aBc');
            const logoShape = new Square(200);
            logoShape.addStyle({ 'stroke': 'green' })
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            svgFile.addStyle({ 'background-color': '#ffffff' })
            expect(svgFile.render()).toBe(result)
        });
        test('rendering SVG without styles for the SVG, shape, and text', () => {
            const result = `<svg viewBox="-150 -100 300 200" xmlns="http://www.w3.org/2000/svg" style="background-color:yellow;border:1px, black, dashed;">\n<polygon points="0, -86.60254037844386 100, 86.60254037844386 -100, 86.60254037844386" style="fill:gray;stroke:#ffffff;stroke-width:3px;" />\n<text style="font-size:50;text-anchor:middle;fill:#454545;stroke:rgb(10,100,255);font-family:helvetica;dominant-baseline:central;">aBc</text></svg>`;
            const logoText = new Text('aBc');
            logoText.addStyle({
                'font-size': '50',
                'text-anchor': 'middle',
                'fill': '#454545',
                'stroke': 'rgb(10,100,255)', 'font-family': 'helvetica', 'dominant-baseline': 'central',
            });
            const logoShape = new Triangle(200);
            logoShape.addStyle({
                'fill': 'gray',
                'stroke': '#ffffff',
                'stroke-width': '3px',
            });
            const svgFile = new SVG({ logoText: logoText, logoShape: logoShape });
            svgFile.addStyle({
                'background-color': 'yellow',
                'border': '1px, black, dashed'
            });
            expect(svgFile.render()).toBe(result)
        });
    });
});