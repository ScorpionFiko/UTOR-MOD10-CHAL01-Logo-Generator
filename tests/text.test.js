const Text = require('../lib/text.js');

describe('Text Class Tests', () => {
    describe('Constructor Tests', () => {
        test('testing constructor without passing a string', () => {
            const result = 'The logo must be a maximum of 3 characters';
            expect(() => new Text()).toThrow(result);

        });
        test('testing constructor with passing an empty string', () => {
            const result = 'The logo must be a maximum of 3 characters';
            expect(() => new Text('')).toThrow(result);

        });
        test('testing constructor with a string contianing more than 3 characters', () => {
            const result = 'The logo must be a maximum of 3 characters';
            expect(() => new Text('abcd')).toThrow(result);
        });
        test('testing constructor with a string between 1 and 3 characters', () => {
            const result = 'ab';
            const logoText = new Text('ab');
            expect(logoText.text).toBe(result);

        });
    });
    describe('Testing addStyle function', () => {
        test('testing function without passing anything', () => {
            const result = '{}';
            const someText = new Text('ab');
            someText.addStyle();
            expect(JSON.stringify(someText.style)).toBe(result);

        });
        test('testing function with passing an empty string', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const someText = new Text('ab');
            expect(() => {someText.addStyle('')}).toThrow(result);

        });
        test('testing function with a non-object variable', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const someText = new Text('ab');
            expect(() => {someText.addStyle('abcd')}).toThrow(result);
        });
        test('testing function with a single key:value pair in the object', () => {
            const result = 'value1';
            const someText = new Text('ab');
            someText.addStyle({propertyA: 'value1'} );
            expect(someText.style.propertyA).toBe(result);

        });
        test('testing function with a multiple key:value pair in the object; testing first element', () => {
            const result = 'value1';
            const someText = new Text('ab');
            someText.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(someText.style.propertyA).toBe(result);

        });
        test('testing constructor with a multiple key:value pair in the object; testing second element', () => {
            const result = 'vaLue2';
            const someText = new Text('ab');
            someText.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(someText.style.propertyB).toBe(result);

        });
        test('testing constructor with a multiple key:value pair in the object; testing third element', () => {
            const result = 'Value3';
            const someText = new Text('ab');
            someText.addStyle({propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3'} );
            expect(someText.style.propertyC).toBe(result);

        });
    });
    describe('Testing render function', () => {
        test('testing function without styling', () => {
            const result = `<text style="">ab</text>`;
            const someText = new Text('ab');
            expect(someText.render()).toBe(result);

        });
        test('testing function with passing font-family', () => {
            const result = `<text style="font-family:Helvetica;">ab</text>`;
            const someText = new Text('ab');
            someText.addStyle({'font-family': 'Helvetica'});
            expect(someText.render()).toBe(result);

        });
        test('testing function with passing more than one style', () => {
            const result = `<text style="font-size:80;text-anchor:middle;fill:#454545;stroke:rgb(10,100,255);font-family:helvetica;dominant-baseline:central;">aB</text>`;
            const someText = new Text('aB');
            someText.addStyle({
                'font-size': "80", 
                'text-anchor': "middle", 
                'fill':"#454545", 
                'stroke':"rgb(10,100,255)", 'font-family':"helvetica", 'dominant-baseline':"central"
            });
            expect(someText.render()).toBe(result);
        });
 
    });

});