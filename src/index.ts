export type SerializablePrimitive = string | number | boolean | null;

export type SerializableValue = SerializablePrimitive | SerializableObject | SerializableArray;

export type SerializableArray = SerializableValue[] | readonly SerializableValue[];

export type SerializableObject = {
    [K in string]: SerializableValue;
} & {
    [K in string]?: SerializableValue | undefined;
};

export type PlainPrimitive = SerializablePrimitive | undefined;

export type PlainValue = PlainPrimitive | PlainObject | PlainArray;

export type PlainArray = PlainValue[] | readonly PlainValue[];

export type PlainObject = {
    [K in string]: PlainValue;
} & {
    [K in string]?: PlainValue | undefined;
};

export type PlainObjectShallow = {
    [K in string]: any;
} & {
    [K in string]?: any | undefined;
};

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
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    let proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
};


export const isPlainArray = (value: unknown): value is PlainArray => {
    if (!Array.isArray(value)) {
        return false;
    }

    return value.every(v => {
        if (isPlainPrimitive(v)) {
            return true;
        }

        if (Array.isArray(v)) {
            return isPlainArray(v);
        }

        return isPlainObject(v);
    });
};

export const isPlainObject = (value: unknown): value is PlainObject => {
    if (!isPlainObjectShallow(value)) {
        return false;
    }

    return Object.values(value).every(v => {
        if (isPlainPrimitive(v)) {
            return true;
        }

        if (Array.isArray(v)) {
            return isPlainArray(v);
        }

        return isPlainObject(v);
    });
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
