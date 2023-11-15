import {
    isSerializablePrimitive,
    isPlainPrimitive,
    isPlainObjectShallow,
    isPlainArray,
    isPlainObject,
    isPlainValue,
} from './index';

describe('isSerializablePrimitive', () => {
    const cases = [
        [true, 1, '1'],
        [true, 'foo', "'foo'"],
        [true, true, 'true'],
        [true, null, 'null'],
        [false, undefined, 'undefined'],
        [false, NaN, 'NaN'],
        [false, Infinity, 'Infinity'],
    ];

    cases.forEach(([expected, value, exp]) => {
        it(`should return '${expected}' for "${exp}"`, () => {
            expect(isSerializablePrimitive(value)).toBe(expected);
        })
    });
});

describe('isPlainPrimitive', () => {
    const cases = [
        [true, 1, '1'],
        [true, 'foo', "'foo'"],
        [true, true, 'true'],
        [true, null, 'null'],
        [true, undefined, 'undefined'],
        [false, NaN, 'NaN'],
        [false, Infinity, 'Infinity'],
    ];

    cases.forEach(([expected, value, exp]) => {
        it(`should return '${expected}' for "${exp}"`, () => {
            expect(isPlainPrimitive(value)).toBe(expected);
        })
    });
});

describe('isPlainObjectShallow', () => {
    const cases = [
        // true
        [true, {}, '{}'],
        [true, {foo: 'bar'}, "{foo: 'bar'}"],
        [true, new Object(), 'new Object()'],
        [true, new Object(null), 'new Object(null)'],
        [true, new Object({}), 'new Object({})'],
        [true, Object.create(Object.prototype), 'Object.create(Object.prototype)'],
        // deep true
        [true, {foo: {}}, '{foo: {}}'],
        [true, {foo: {bar: undefined}}, "{foo: {bar: undefined}}"],
        [true, {foo: {bar: null}}, "{foo: {bar: null}}"],
        [true, {foo: {bar: 'baz'}}, "{foo: {bar: 'baz'}}"],
        [true, {foo: {bar: [[1, true]]}}, "{foo: {bar: [[1, true]]}}"],
        [true, {foo: {bar: {baz: []}}}, "{foo: {bar: {baz: []}}}"],
        [true, {foo: {bar: {baz: [1, 'qux', true, undefined, null]}}}, "{foo: {bar: {baz: [1, 'qux', true, undefined, null]}}}"],
        [true, {foo: {bar: new Object()}}, '{bar: new Object()}}'],
        [true, {foo: {bar: new Object(null)}}, '{bar: new Object(null)}}'],
        [true, {foo: {bar: new Object({})}}, '{bar: new Object({})}}'],
        [true, {foo: {bar: Object.create(Object.prototype)}}, '{bar: Object.create(Object.prototype)}}}'],
        // false
        [false, undefined, 'undefined'],
        [false, null, 'null'],
        [false, false, 'false'],
        [false, NaN, 'NaN'],
        [false, Infinity, 'Infinity'],
        [false, 1, '1'],
        [false, 'foo', "'foo'"],
        [false, [], '[]'],
        [false, ['foo', 'bar'], "['foo', 'bar']"],
        [false, Object.create(null), 'Object.create(null)'],
        [false, Object.create({}), 'Object.create({})'],
        [false, new (class Foo {}), 'new (class Foo {})'],
        // deep true, which not correct
        [true, {1: {bar: [NaN]}}, '{1: {bar: [NaN]}}'],
        [true, {foo: {bar: [NaN]}}, '{foo: {bar: [NaN]}}'],
        [true, {foo: {bar: [Infinity]}}, '{foo: {bar: [Infinity]}}'],
        [true, {foo: {bar: {baz: NaN}}}, '{foo: {bar: {baz: NaN}}}'],
        [true, {foo: {bar: {baz: [1, false, NaN]}}}, '{foo: {bar: {baz: [1, false, NaN]}}}'],
        [true, {foo: {bar: {baz: [1, false, Infinity]}}}, '{foo: {bar: {baz: [1, false, Infinity]}}}'],
        [true, {foo: {bar: {baz: Object.create(null)}}}, '{foo: {bar: {baz: Object.create(null)}}}'],
        [true, {foo: {bar: {baz: Object.create({})}}}, '{foo: {bar: {baz: Object.create({})}}}'],
        [true, {foo: {bar: new (class Foo {})}}, '{foo: {bar: new (class Foo {})}}'],
    ] as const;

    cases.forEach(([expected, value, exp]) => {
        it(`should return '${expected}' for "${exp}"`, () => {
            expect(isPlainObjectShallow(value)).toBe(expected);
        })
    });
});

describe('isPlainArray', () => {
    const cases = [
        // true
        [true, [], '[]'],
        [true, [undefined], '[undefined]'],
        [true, [null], '[null]'],
        [true, [true], '[true]'],
        [true, [1], '[1]'],
        [true, ['foo'], "['foo']"],
        // deep true
        [true, [['foo'], 1, [true, null]], "[['foo'], 1, [true, null]]"],
        [true, [{foo: 'bar'}, 'baz'], "[{foo: 'bar'}, 'baz']"],
        // false
        [false, 1, '1'],
        [false, false, 'false'],
        [false, undefined, 'undefined'],
        [false, null, 'null'],
        [false, [NaN], '[NaN]'],
        [false, [Infinity], '[Infinity]'],
    ] as const;

    cases.forEach(([expected, value, exp]) => {
        it(`should return '${expected}' for "${exp}"`, () => {
            expect(isPlainArray(value)).toBe(expected);
        })
    });
});

describe('isPlainObject', () => {
    const cases = [
        // true
        [true, {}, '{}'],
        [true, {foo: 'bar'}, "{foo: 'bar'}"],
        [true, new Object(), 'new Object()'],
        [true, new Object(null), 'new Object(null)'],
        [true, new Object({}), 'new Object({})'],
        [true, Object.create(Object.prototype), 'Object.create(Object.prototype)'],
        // deep true
        [true, {foo: {}}, '{foo: {}}'],
        [true, {foo: {bar: undefined}}, "{foo: {bar: undefined}}"],
        [true, {foo: {bar: null}}, "{foo: {bar: null}}"],
        [true, {foo: {bar: 'baz'}}, "{foo: {bar: 'baz'}}"],
        [true, {foo: {bar: [[1, true]]}}, "{foo: {bar: [[1, true]]}}"],
        [true, {foo: {bar: {baz: []}}}, "{foo: {bar: {baz: []}}}"],
        [true, {foo: {bar: {baz: [1, 'qux', true, undefined, null]}}}, "{foo: {bar: {baz: [1, 'qux', true, undefined, null]}}}"],
        [true, {foo: {bar: new Object()}}, '{bar: new Object()}}'],
        [true, {foo: {bar: new Object(null)}}, '{bar: new Object(null)}}'],
        [true, {foo: {bar: new Object({})}}, '{bar: new Object({})}}'],
        [true, {foo: {bar: Object.create(Object.prototype)}}, '{bar: Object.create(Object.prototype)}}}'],
        // false
        [false, undefined, 'undefined'],
        [false, null, 'null'],
        [false, false, 'false'],
        [false, NaN, 'NaN'],
        [false, Infinity, 'Infinity'],
        [false, 1, '1'],
        [false, 'foo', "'foo'"],
        [false, [], '[]'],
        [false, ['foo', 'bar'], "['foo', 'bar']"],
        [false, Object.create(null), 'Object.create(null)'],
        [false, Object.create({}), 'Object.create({})'],
        [false, new (class Foo {}), 'new (class Foo {})'],
        // deep false
        [false, {1: {bar: [NaN]}}, '{1: {bar: [NaN]}}'],
        [false, {foo: {bar: [NaN]}}, '{foo: {bar: [NaN]}}'],
        [false, {foo: {bar: [Infinity]}}, '{foo: {bar: [Infinity]}}'],
        [false, {foo: {bar: {baz: NaN}}}, '{foo: {bar: {baz: NaN}}}'],
        [false, {foo: {bar: {baz: [1, false, NaN]}}}, '{foo: {bar: {baz: [1, false, NaN]}}}'],
        [false, {foo: {bar: {baz: [1, false, Infinity]}}}, '{foo: {bar: {baz: [1, false, Infinity]}}}'],
        [false, {foo: {bar: {baz: Object.create(null)}}}, '{foo: {bar: {baz: Object.create(null)}}}'],
        [false, {foo: {bar: {baz: Object.create({})}}}, '{foo: {bar: {baz: Object.create({})}}}'],
        [false, {foo: {bar: new (class Foo {})}}, '{foo: {bar: new (class Foo {})}}'],
    ] as const;

    cases.forEach(([expected, value, exp]) => {
        it(`should return '${expected}' for "${exp}"`, () => {
            expect(isPlainObject(value)).toBe(expected);
        })
    });
});

describe('isPlainValue', () => {
    const cases = [
        // true
        [true, 1, '1'],
        [true, 'foo', "'foo'"],
        [true, true, 'true'],
        [true, null, 'null'],
        [true, undefined, 'undefined'],
        [true, {}, '{}'],
        [true, {foo: 'bar'}, "{foo: 'bar'}"],
        [true, new Object(), 'new Object()'],
        [true, new Object(null), 'new Object(null)'],
        [true, new Object({}), 'new Object({})'],
        [true, Object.create(Object.prototype), 'Object.create(Object.prototype)'],
        [true, [], '[]'],
        [true, [undefined], '[undefined]'],
        [true, [null], '[null]'],
        [true, [true], '[true]'],
        [true, [1], '[1]'],
        [true, ['foo'], "['foo']"],
        // deep true
        [true, [['foo'], 1, [true, null]], "[['foo'], 1, [true, null]]"],
        [true, [{foo: 'bar'}, 'baz'], "[{foo: 'bar'}, 'baz']"],
        [true, {foo: {}}, '{foo: {}}'],
        [true, {foo: {bar: undefined}}, "{foo: {bar: undefined}}"],
        [true, {foo: {bar: null}}, "{foo: {bar: null}}"],
        [true, {foo: {bar: 'baz'}}, "{foo: {bar: 'baz'}}"],
        [true, {foo: {bar: [[1, true]]}}, "{foo: {bar: [[1, true]]}}"],
        [true, {foo: {bar: {baz: []}}}, "{foo: {bar: {baz: []}}}"],
        [true, {foo: {bar: {baz: [1, 'qux', true, undefined, null]}}}, "{foo: {bar: {baz: [1, 'qux', true, undefined, null]}}}"],
        [true, {foo: {bar: new Object()}}, '{bar: new Object()}}'],
        [true, {foo: {bar: new Object(null)}}, '{bar: new Object(null)}}'],
        [true, {foo: {bar: new Object({})}}, '{bar: new Object({})}}'],
        [true, {foo: {bar: Object.create(Object.prototype)}}, '{bar: Object.create(Object.prototype)}}}'],
        // false
        [false, NaN, 'NaN'],
        [false, Infinity, 'Infinity'],
        [false, Object.create(null), 'Object.create(null)'],
        [false, Object.create({}), 'Object.create({})'],
        [false, new (class Foo {}), 'new (class Foo {})'],
        // deep false
        [false, {1: {bar: [NaN]}}, '{1: {bar: [NaN]}}'],
        [false, {foo: {bar: [NaN]}}, '{foo: {bar: [NaN]}}'],
        [false, {foo: {bar: [Infinity]}}, '{foo: {bar: [Infinity]}}'],
        [false, {foo: {bar: {baz: NaN}}}, '{foo: {bar: {baz: NaN}}}'],
        [false, {foo: {bar: {baz: [1, false, NaN]}}}, '{foo: {bar: {baz: [1, false, NaN]}}}'],
        [false, {foo: {bar: {baz: [1, false, Infinity]}}}, '{foo: {bar: {baz: [1, false, Infinity]}}}'],
        [false, {foo: {bar: {baz: Object.create(null)}}}, '{foo: {bar: {baz: Object.create(null)}}}'],
        [false, {foo: {bar: {baz: Object.create({})}}}, '{foo: {bar: {baz: Object.create({})}}}'],
        [false, {foo: {bar: new (class Foo {})}}, '{foo: {bar: new (class Foo {})}}'],
    ] as const;

    cases.forEach(([expected, value, exp]) => {
        it(`should return '${expected}' for "${exp}"`, () => {
            expect(isPlainValue(value)).toBe(expected);
        })
    });
});
