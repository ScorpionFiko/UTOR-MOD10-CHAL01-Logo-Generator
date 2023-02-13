const Square = require('../lib/square.js');
const Style = require('../lib/style.js');

describe('Square Class Tests', () => {
    describe('Constructor Tests', () => {
        test('testing with no input provided', () => {
            const result = `The square width must be between 1 and 200`;
            expect(() => new Square()).toThrow(result);
        });
        test('testing with not providing a number', () => {
            const result = `The square width must be between 1 and 200`;
            expect(() => new Square('qw')).toThrow(result);
        });
        test('testing with width greater than 200', () => {
            const result = `The square width must be between 1 and 200`;
            expect(() => new Square(201)).toThrow(result);
        });
        test('testing with less than 1', () => {
            const result = `The square width must be between 1 and 200`;
            expect(() => new Square(-1)).toThrow(result);
        });
        test('testing with explicit undefined', () => {
            const result = `The square width must be between 1 and 200`;
            expect(() => new Square(undefined)).toThrow(result);
        });
        test('testing with correct values; testing width', () => {
            const result = 100;
            const square = new Square(100);
            expect(square.width).toBe(result);
        });
        test('testing with correct values; testing height', () => {
            const result = 100;
            const square = new Square(100);
            expect(square.height).toBe(result);
        });
        test('testing with correct values; testing X origin', () => {
            const result = 0-100/2;
            const square = new Square(100);
            expect(square.originX).toBe(result);
        });
        test('testing with correct values; testing Y origin', () => {
            const result = 0-100/2;
            const square = new Square(100);
            expect(square.originY).toBe(result);
        });
    });
    describe('Testing addStyle function', () => {
        test('testing function without passing anything', () => {
            const result = '{}';
            const square = new Square(100);
            square.addStyle();
            expect(JSON.stringify(square.style)).toBe(result);

        });
        test('testing function with passing an empty string', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const square = new Square(100);
            expect(() => {square.addStyle('')}).toThrow(result);

        });
        test('testing function with a non-object variable', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const square = new Square(100);
            expect(() => {square.addStyle('abcd')}).toThrow(result);
        });
        test('testing function with a single key:value pair in the object', () => {
            const result = 'value1';
            const square = new Square(100);
            square.addStyle({propertyA: 'value1'} );
            expect(square.style.propertyA).toBe(result);

        });
        test('testing function with a multiple key:value pair in the object; testing first element', () => {
            const result = 'value1';
            const square = new Square(100);
            square.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(square.style.propertyA).toBe(result);

        });
        test('testing constructor with a multiple key:value pair in the object; testing second element', () => {
            const result = 'vaLue2';
            const square = new Square(100);
            square.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(square.style.propertyB).toBe(result);

        });
        test('testing constructor with a multiple key:value pair in the object; testing third element', () => {
            const result = 'Value3';
            const square = new Square(100);
            square.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(square.style.propertyC).toBe(result);

        });
    });
    describe('Testing render function', () => {
        test('testing function without styling', () => {
            const result = `<rect x="-50" y="-50" width="100" height="100" style="" />`;
            const square = new Square(100);
            expect(square.render()).toBe(result);

        });
        test('testing function with passing fill colour', () => {
            const result = `<rect x="-50" y="-50" width="100" height="100" style="fill:rgb(255,0,12);" />`;
            const square = new Square(100);
            square.addStyle({'fill': 'rgb(255,0,12)'});
            expect(square.render()).toBe(result);

        });
        test('testing function with passing more than one style', () => {
            const result = `<rect x="-50" y="-50" width="100" height="100" style="fill:gray;stroke:#000000;stroke-width:3px;" />`;
            const square = new Square(100);
            square.addStyle({
                'fill': "gray", 
                'stroke': "#000000", 
                'stroke-width':"3px", 

            });
            expect(square.render()).toBe(result);
        });
 
    });

});