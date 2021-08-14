//-----------------generics:
// some of this was taken from here: https://youtu.be/nViEqpgwxHE
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

// Another example:
const makeArr = <T,T2>(x:T,y:T2)=>{
    return [x,y]
}

const arra = makeArr(4,"words")
// Pretty straightforward, this function takes in 2 arguments, and returns them in an array.

// If we hover over arra we can see the return type is a union. If we wanted it to be a tuple (see tuple file) we could specify as much:

const makeArr1 = <T,T2>(x:T,y:T2):[T,T2]=>{
    return [x,y]
}

const arra1 = makeArr1(4,"words")

//either way, this function will work with any arguments. we can also declare a default type:
const makeArr2 = <T,T2=unknown>(x:T,y:T2):[T,T2]=>{
    return [x,y]
}

const arra2 = makeArr2(4, {prop:"value"})
const arra3 = makeArr2(4, true)

// We can also override the generic type and declare it ourselves:
const arra4 = makeArr2<string,boolean>("words",false)
//and since we have a default type for T2 we can also do it like so:
const arra5 = makeArr2<number>(4,"yes")

// Extending generic types:

//say we have a function like so:
const makeFullName = (obj:{firstName:string,lastName:string})=>{
    return {
        ...obj,
        fullName:obj.firstName+' '+obj.lastName
    }
}
const v1 = makeFullName({firstName:'Bob',lastName:'Marley'})
// But what if we have an object that contains more than just the first and last name? Do we need to account for every single property and
// start writing optional properties? Obviously not, we can do like so:

const makeFullName2 = <T extends {firstName:string,lastName:string}>(obj:T)=>{
    return {
        ...obj,
        fullName:obj.firstName+' '+obj.lastName
    }
}
// This way we can accept an object with any amount of properties, so long as it has AT LEAST a firstName and lastName prop like so:
const v2 = makeFullName2({firstName:'Bob',lastName:'Marley', age:30, isAlive:false})

// Type variables with interfaces:

interface Tab<T> {
    id:number;
    position:number;
    data:T;
}
// This shows a case where we may have different data types for each tab, then we could have a few different tabs, like so:
type NumberTab = Tab<number>;
type StringTab = Tab<string>;
// StringTab here is the equivelant of writing this:
interface SameSame { // SameSame as in, this is the equivilant of StringTab
    id:number;
    position:number;
    data:string;
}

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