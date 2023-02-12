const Circle = require('../lib/circle.js');
const Style = require('../lib/style.js');

describe('Circle Class Tests', () => {
    describe('Constructor Tests', () => {
        test('testing with no input provided', () => {
            const result = `The circle diameter must be between 1 and 200`;
            expect(() => new Circle()).toThrow(result);
        });
        test('testing with not providing a number', () => {
            const result = `The circle diameter must be between 1 and 200`;
            expect(() => new Circle('qw')).toThrow(result);
        });
        test('testing with diameter greater than 100', () => {
            const result = `The circle diameter must be between 1 and 200`;
            expect(() => new Circle(201)).toThrow(result);
        });
        test('testing with less than 1', () => {
            const result = `The circle diameter must be between 1 and 200`;
            expect(() => new Circle(-1)).toThrow(result);
        });
        test('testing with explicit undefined', () => {
            const result = `The circle diameter must be between 1 and 200`;
            expect(() => new Circle(undefined)).toThrow(result);
        });
        test('testing with correct values; testing diameter', () => {
            const result = 100;
            const circle = new Circle(200);
            expect(circle.radius).toBe(result);
        });

    });
    describe('Testing addStyle function', () => {
        test('testing function without passing anything', () => {
            const result = '{}';
            const circle = new Circle(200);
            circle.addStyle();
            expect(JSON.stringify(circle.style)).toBe(result);

        });
        test('testing function with passing an empty string', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const circle = new Circle(200);
            expect(() => {circle.addStyle('')}).toThrow(result);

        });
        test('testing function with a non-object variable', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const circle = new Circle(200);
            expect(() => {circle.addStyle('abcd')}).toThrow(result);
        });
        test('testing function with a single key:value pair in the object', () => {
            const result = 'value1';
            const circle = new Circle(200);
            circle.addStyle({propertyA: 'value1'} );
            expect(circle.style.propertyA).toBe(result);

        });
        test('testing function with a multiple key:value pair in the object; testing first element', () => {
            const result = 'value1';
            const circle = new Circle(200);
            circle.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(circle.style.propertyA).toBe(result);

        });
        test('testing constructor with a multiple key:value pair in the object; testing second element', () => {
            const result = 'vaLue2';
            const circle = new Circle(200);
            circle.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(circle.style.propertyB).toBe(result);

        });
        test('testing constructor with a multiple key:value pair in the object; testing third element', () => {
            const result = 'Value3';
            const circle = new Circle(200);
            circle.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(circle.style.propertyC).toBe(result);

        });
    });
    describe('Testing render function', () => {
        test('testing function without styling', () => {
            const result = `<circle r=100 style="" />`;
            const circle = new Circle(200);
            expect(circle.render()).toBe(result);

        });
        test('testing function with passing fill colour', () => {
            const result = `<circle r=100 style="fill:rgb(255,0,12);" />`;
            const circle = new Circle(200);
            circle.addStyle({'fill': 'rgb(255,0,12)'});
            expect(circle.render()).toBe(result);

        });
        test('testing function with passing more than one style', () => {
            const result = `<circle r=30 style="fill:gray;stroke:#ffffff;stroke-width:3px;" />`;
            const circle = new Circle(60);
            circle.addStyle({
                'fill': "gray", 
                'stroke': "#ffffff", 
                'stroke-width':"3px", 

            });
            expect(circle.render()).toBe(result);
        });
 
    });

});