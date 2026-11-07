export type SerializablePrimitive = string | number | boolean | null;

export type SerializableValue = SerializablePrimitive | SerializableObject | SerializableArray;

export type SerializableArray = SerializableValue[] | readonly SerializableValue[];

export type SerializableObject = {[key: string]: SerializableValue};

export type PlainPrimitive = SerializablePrimitive | undefined;

export type PlainValue = PlainPrimitive | PlainObject | PlainArray;

export type PlainArray = PlainValue[] | readonly PlainValue[];

export type PlainObject = {[key: string]: PlainValue};

export type PlainObjectShallow = {[key: string]: any};

export const isSerializablePrimitive = (value: unknown): value is SerializablePrimitive => {
    if (value === null) {
        return true;
    }

    if (typeof value === 'number') {
        if (Number.isNaN(value)) {
            return false;
        }

        if (!Number.isFinite(value)) {
            return false;
        }

        return true;
    }

    if (typeof value === 'string' || typeof value === 'boolean') {
        return true;
    }

    return false;
};

export const isPlainPrimitive = (value: unknown): value is PlainPrimitive => {
    if (isSerializablePrimitive(value)) {
        return true;
    }

    if (value === undefined) {
        return true;
    }

    return false;
};

export const isPlainObjectShallow = (value: unknown): value is PlainObjectShallow => {
    return typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;
};

type PlainDeepFrame = {
    node: unknown;
    enter: boolean;
};

const pushPlainChildren = (node: object, stack: PlainDeepFrame[]): void => {
    if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
            stack.push({node: node[i], enter: true});
        }

        return;
    }

    for (const key of Object.keys(node)) {
        stack.push({node: (node as Record<string, unknown>)[key], enter: true});
    }
};

const isPlainDeep = (root: unknown): boolean => {
    const inPath = new WeakSet<object>();
    const done = new WeakSet<object>();
    const stack: PlainDeepFrame[] = [{node: root, enter: true}];

    while (stack.length > 0) {
        const frame = stack.pop() as PlainDeepFrame;
        const node = frame.node;

        if (typeof node !== 'object' || node === null) {
            if (!isPlainPrimitive(node)) {
                return false;
            }

            continue;
        }

        if (!frame.enter) {
            inPath.delete(node);
            done.add(node);
            continue;
        }

        if (!Array.isArray(node) && !isPlainObjectShallow(node)) {
            return false;
        }

        if (inPath.has(node)) {
            return false;
        }

        if (done.has(node)) {
            continue;
        }

        inPath.add(node);
        stack.push({node, enter: false});
        pushPlainChildren(node, stack);
    }

    return true;
};

export const isPlainArray = (value: unknown): value is PlainArray => {
    if (!Array.isArray(value)) {
        return false;
    }

    return isPlainDeep(value);
};

export const isPlainObject = (value: unknown): value is PlainObject => {
    if (!isPlainObjectShallow(value)) {
        return false;
    }

    return isPlainDeep(value);
};

export const isPlainValue = (value: unknown): value is PlainValue => {
    if (isPlainPrimitive(value)) {
        return true;
    }

    if (isPlainArray(value)) {
        return true;
    }

    if (isPlainObject(value)) {
        return true;
    }

    return false;
};
