const Style = require('../lib/style.js');

describe('Style Class Tests', () => {
    describe('testing addStyle function', () => {
        test('testing function without passing anything', () => {
            const result = '{}';
            const style = new Style();
            style.addStyle();
            expect(JSON.stringify(style.style)).toBe(result);

        });
        test('testing function with passing an empty string', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const style = new Style();
            expect(() => style.addStyle('')).toThrow(result);

        });
        test('testing function with a non-object variable', () => {
            const result = 'The style must be presented in a "key: value" pair(s).';
            const style = new Style();
            expect(() => style.addStyle('abcd')).toThrow(result);
        });
        test('testing function with a single key:value pair in the object', () => {
            const result = 'value1';
            const style = new Style();
            style.addStyle({ propertyA: 'value1' });
            expect(style.style.propertyA).toBe(result);

        });
        test('testing function with a multiple key:value pairs in the object; testing first key:value pair', () => {
            const result = 'value1';
            const style = new Style();
            style.addStyle({ propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3' });
            expect(style.style.propertyA).toBe(result);

        });
        test('testing function with a multiple key:value pairs in the object; testing second key:value', () => {
            const result = 'vaLue2';
            const style = new Style();
            style.addStyle({ propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3' });
            expect(style.style.propertyB).toBe(result);

        });
        test('testing function with a multiple key:value pairs in the object; testing third key:value', () => {
            const result = 'Value3';
            const style = new Style();
            style.addStyle({ propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3' });
            expect(style.style.propertyC).toBe(result);

        });
    });
    describe('testing renderStyle function', () => {
        test('testing function without passing anything', () => {
            const result = `style=""`;
            const style = new Style();
            expect(style.renderStyle()).toBe(result);

        });
        test('testing function with passing an empty string', () => {
            const result = `The style must be presented in a "key: value" pair(s).`;
            const style = new Style();
            expect(() => { style.renderStyle('') }).toThrow(result);

        });
        test('testing function with a non-object variable', () => {
            const result = `The style must be presented in a "key: value" pair(s).`;
            const style = new Style();
            expect(() => { style.renderStyle('') }).toThrow(result);
        });
        test('testing function with a single key:value pair in the object', () => {
            const result = 'style="propertyA:value1;"';
            const style = new Style();
            expect(style.renderStyle({ propertyA: 'value1' })).toBe(result);

        });
        test('testing function with a multiple key:value pairs in the object', () => {
            const result = 'style="propertyA:value1;propertyB:vaLue2;propertyC:Value3;"';
            const style = new Style();
            expect(style.renderStyle({ propertyA: 'value1', propertyB: 'vaLue2', propertyC: 'Value3' })).toBe(result);

        });
    });

});