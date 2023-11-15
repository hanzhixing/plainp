# PlainP
Plain Predicates

[![MIT License](https://img.shields.io/npm/l/plainp.svg)](https://github.com/hanzhixing/plainp/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/plainp.svg)](https://www.npmjs.com/package/plainp)
[![npm download](https://img.shields.io/npm/dt/plainp.svg)](https://www.npmjs.com/package/plainp)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/plainp.svg)](https://www.npmjs.com/package/plainp)

## Introduction
Functions test if values are plain objects or values.

## Installation

```bash
$ npm install --save plainp
```

## Usage

### Typescript types

#### JSON data types

```typescript
import type from {
    SerializablePrimitive,
    SerializableValue,
    SerializableArray,
    SerializableObject
} from 'plainp';
```

#### JSON data types + `undefined`
```typescript
import type from {
    PlainPrimitive,
    PlainValue,
    PlainArray,
    PlainObject,
    PlainObjectShallow
} from 'plainp'
```

### Utility functions
```javascript
import from {
    isSerializablePrimitive,
    isPlainPrimitive,
    isPlainObjectShallow,
    isPlainArray,
    isPlainObject,
} from 'plainp'
```

#### isSerializablePrimitive

``` javascript
// => true
isSerializablePrimitive(1);
isSerializablePrimitive('foo');
isSerializablePrimitive(true);
isSerializablePrimitive(null);

// => false
isSerializablePrimitive(undefined);
isSerializablePrimitive(NaN);
isSerializablePrimitive(Infinity);
```

#### isPlainPrimitive

``` javascript
// => true
isPlainPrimitive(1);
isPlainPrimitive('foo');
isPlainPrimitive(true);
isPlainPrimitive(null);
isPlainPrimitive(undefined);

// => false
isPlainPrimitive(NaN);
isPlainPrimitive(Infinity);
```

#### isPlainObjectShallow

``` javascript
// => true
isPlainObjectShallow({});
isPlainObjectShallow({foo: 'bar'});
isPlainObjectShallow(new Object());
isPlainObjectShallow(new Object(null));
isPlainObjectShallow(new Object({}));
isPlainObjectShallow(Object.create(Object.prototype));

// => false
isPlainObjectShallow(undefined);
isPlainObjectShallow(null);
isPlainObjectShallow(false);
isPlainObjectShallow(NaN);
isPlainObjectShallow(Infinity);
isPlainObjectShallow(1);
isPlainObjectShallow('foo');
isPlainObjectShallow([]);
isPlainObjectShallow(Object.create(null));
isPlainObjectShallow(Object.create({}));
isPlainObjectShallow(new (class Foo {}));
```

#### isPlainArray

``` javascript
// => true
isPlainArray([]);
isPlainArray([undefined]);
isPlainArray([null]);
isPlainArray([true]);
isPlainArray(['foo']);
isPlainArray([['foo'], 1, [true, null]]);
isPlainArray([{foo: 'bar'}, 'baz']);

// => false
isPlainArray(1);
isPlainArray(false);
isPlainArray(undefined);
isPlainArray(null);
isPlainArray([NaN]);
isPlainArray([Infinity]);
```

#### isPlainObject

``` javascript
// => true
isPlainObject({});
isPlainObject({foo: 'bar'});
isPlainObject(new Object());
isPlainObject(new Object(null));
isPlainObject(new Object({}));
isPlainObject(Object.create(Object.prototype));
isPlainObject({foo: {}});
isPlainObject({foo: {bar: undefined}});
isPlainObject({foo: {bar: null}});
isPlainObject({foo: {bar: 'baz'}});
isPlainObject({foo: {bar: [[1, true]]}});
isPlainObject({foo: {bar: {baz: []}}});
isPlainObject({foo: {bar: {baz: [1, 'qux', true, undefined, null]}}});
isPlainObject({foo: {bar: new Object()}});
isPlainObject({foo: {bar: new Object(null)}});
isPlainObject({foo: {bar: new Object({})}});
isPlainObject({foo: {bar: Object.create(Object.prototype)}});

// => false
isPlainObject(undefined);
isPlainObject(null);
isPlainObject(false);
isPlainObject(NaN);
isPlainObject(Infinity);
isPlainObject(1);
isPlainObject('foo');
isPlainObject([]);
isPlainObject(['foo', 'bar']);
isPlainObject(Object.create(null));
isPlainObject(Object.create({}));
isPlainObject(new (class Foo {}));
isPlainObject({1: {bar: [NaN]}});
isPlainObject({foo: {bar: [NaN]}});
isPlainObject({foo: {bar: [Infinity]}});
isPlainObject({foo: {bar: {baz: NaN}}});
isPlainObject({foo: {bar: {baz: [1, false, NaN]}}});
isPlainObject({foo: {bar: {baz: [1, false, Infinity]}}});
isPlainObject({foo: {bar: {baz: Object.create(null)}}});
isPlainObject({foo: {bar: {baz: Object.create({})}}});
isPlainObject({foo: {bar: new (class Foo {})}});
```

#### isPlainValue

``` javascript
isPlainPrimitive(value) || isPlainArray(value) | isPlainObject(value)
```

## License
[MIT licensed](./LICENSE).
