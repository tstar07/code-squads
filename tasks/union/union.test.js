import union from './union';  

describe('Union of mixed arrays', () => {

    test('union of primitive arr values', () => {
        expect(union([1, 2, 3], [2, 3, 4])).toStrictEqual([1, 2, 3, 4]); // Output: [1, 2, 3, 4]
        expect(union(['a'], ['b'])).toStrictEqual(['a', 'b']);  // Output: ['a', 'b']
        expect(union([1], ['1', 1])).toStrictEqual([1, '1']);   // Output: [1, '1']
    });

    test('union of same objects', () => {
        expect(union([{ a: { b: 10 } }], [{ a: { b: 20 } }])).toStrictEqual([{ a: { b: 10 } }, { a: { b: 20 } }]); // Output: [{ a: { b: 10 } }, { a: { b: 20 } }]
    });

    test('union of mixed nested objects and arrays', () => {
        const arr1 = [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2];
        const arr2 = [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, '2'];
        expect(union(arr1, arr2)).toStrictEqual([{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2, '2']); // Output: [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2, '2']
    });

    test('union of empty arr values', () => {
        expect(union([], [])).toStrictEqual([]);                // Output: []
        expect(union([1, 2, 3], [])).toStrictEqual([1, 2, 3]);  // Output: [1, 2, 3]
        expect(union([], ['1', 1])).toStrictEqual(['1', 1]);   // Output: ['1', 1]
    });

    test('union of mixed types', () => {
        const arr1 = [{ a: 1 }, 2, 3, 'string1'];
        const arr2 = ['string2', { a: 1 }, 4, 5];
        expect(union(arr1, arr2)).toStrictEqual([{ a: 1 }, 2, 3, 'string1', 'string2', 4, 5]);
    });

});