const Triangle = require('../lib/triangle.js');
const Style = require('../lib/style.js');

describe('Triangle Class Tests', () => {
    describe('Constructor Tests', () => {
        test('testing with no input provided', () => {
            const result = `The Triangle side must be between 1 and 200`;
            expect(() => new Triangle()).toThrow(result);
        });
        test('testing with not providing a number', () => {
            const result = `The Triangle side must be between 1 and 200`;
            expect(() => new Triangle('qw')).toThrow(result);
        });
        test('testing with radius greater than 200', () => {
            const result = `The Triangle side must be between 1 and 200`;
            expect(() => new Triangle(201)).toThrow(result);
        });
        test('testing with less than 1', () => {
            const result = `The Triangle side must be between 1 and 200`;
            expect(() => new Triangle(-1)).toThrow(result);
        });
        test('testing with explicit undefined', () => {
            const result = `The Triangle side must be between 1 and 200`;
            expect(() => new Triangle(undefined)).toThrow(result);
        });
        test('testing with correct Triangle values; testing radius', () => {
            const result = 200;
            const triangle = new Triangle(200);
            expect(triangle.sideWidth).toBe(result);
        });

    });
    describe('Testing addStyle function', () => {
        test('testing function without passing anything', () => {
            const result = '{}';
            const triangle = new Triangle(200);
            triangle.addStyle();
            expect(JSON.stringify(triangle.style)).toBe(result);

        });
        test('testing function with passing an empty string', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const triangle = new Triangle(200);
            expect(() => {triangle.addStyle('')}).toThrow(result);

        });
        test('testing function with a non-object variable', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const triangle = new Triangle(200);
            expect(() => {triangle.addStyle('abcd')}).toThrow(result);
        });
        test('testing function with a single key:value pair in the object', () => {
            const result = 'value1';
            const triangle = new Triangle(200);
            triangle.addStyle({propertyA: 'value1'} );
            expect(triangle.style.propertyA).toBe(result);

        });
        test('testing function with a multiple key:value pair in the object; testing first element', () => {
            const result = 'value1';
            const triangle = new Triangle(200);
            triangle.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(triangle.style.propertyA).toBe(result);

        });
        test('testing constructor with a multiple key:value pair in the object; testing second element', () => {
            const result = 'vaLue2';
            const triangle = new Triangle(200);
            triangle.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(triangle.style.propertyB).toBe(result);

        });
        test('testing constructor with a multiple key:value pair in the object; testing third element', () => {
            const result = 'Value3';
            const triangle = new Triangle(200);
            triangle.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(triangle.style.propertyC).toBe(result);

        });
    });
    describe('Testing render function', () => {
        test('testing function without styling', () => {
            const result = `<polygon points="0, -86.60254037844386 100, 86.60254037844386 -100, 86.60254037844386" style="" />`;
            const triangle = new Triangle(200);
            expect(triangle.render()).toBe(result);

        });
        test('testing function with passing fill colour', () => {
            const result = `<polygon points="0, -86.60254037844386 100, 86.60254037844386 -100, 86.60254037844386" style="fill:rgb(255,0,12);" />`;
            const triangle = new Triangle(200);
            triangle.addStyle({'fill': 'rgb(255,0,12)'});
            expect(triangle.render()).toBe(result);

        });
        test('testing function with passing more than one style', () => {
            const result = `<polygon points="0, -86.60254037844386 100, 86.60254037844386 -100, 86.60254037844386" style="fill:gray;stroke:#ffffff;stroke-width:3px;" />`;
            const triangle = new Triangle(200);
            triangle.addStyle({
                'fill': "gray", 
                'stroke': "#ffffff", 
                'stroke-width':"3px", 

            });

            expect(triangle.render()).toBe(result);
        });
 
    });

});