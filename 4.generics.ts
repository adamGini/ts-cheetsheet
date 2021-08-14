//-----------------generics:
console.log('-----------generics------------');

// in the example below we have a type variable, that will change according to what is passed to it
function identity<T>(arg: T): T {
    return arg;
} // T is a type variable
// in the example above we can call this function in two way, one is to pass it all the information, including the type, like so:
let output = identity<string>("myString");
// we really don't need to do this though, we can rely on type inference and call the function like so:
let output2 = identity("myString");
/* Just like any other thing in typescript, its best to rely on type inference when possible. Only when the compiler fails to infer the type do we use the explicit syntax (with the <>) */

// another example:
function loggingIdentity<Type>(arg: Type[]): Type[] {
    console.log('length: ', arg.length);
    return arg;
}

loggingIdentity([6, 4, 2])

// making a simple state:

function simpleState<T>(
    initial: T
): [() => T, (v: T) => void] {
    let val: T = initial;
    return [
        () => val,
        (v: T) => {
            val = v;
        },
    ];
}

const [stGetter, stSetter] = simpleState(10)
console.log(stGetter())
stSetter(6)
console.log(stGetter())

// overriding the initial type:
// we're going to start off with the initial type being null, then set it to be a string
const [st2Getter, st2Setter] = simpleState<null | string>(null)// with the <> after the function name does the overriding
console.log(st2Getter())
st2Setter("bar")
console.log(st2Getter())

// Implementing generic types together with generic interfaces and what not can be seen here: https://youtu.be/Q4QDyr0jLfo?t=229

// Generics with keyof:
console.log('-------- generics with keyof -----------');

function pluck<DataType, KeyType extends keyof DataType>(
    items: DataType[],
    key: KeyType
): DataType[KeyType][] {
    return items.map((item) => item[key]);
}

const dogs = [
    { name: "Mimi", age: 12 },
    { name: "LG", age: 13 },
];


console.log(pluck(dogs, "age"));
console.log(pluck(dogs, "name"));

interface BaseEvent {
    time: number;
    user: string;
}
interface EventMap {
    addToCart: BaseEvent & { quantity: number; productID: string }; // note & which basically means addtocart is a combination of the two
    checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
    name: Name,
    data: EventMap[Name]
): void {
    console.log([name, data]);
}

sendEvent("addToCart", {
    productID: "foo",
    user: "baz",
    quantity: 1,
    time: 10,
});
sendEvent("checkout", { time: 20, user: "bob" });