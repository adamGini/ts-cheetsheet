//----------- functions:
function addNumbers(a: number, b: number): number {
    return a + b;
}

function go2(x: number, y: number): number {
    return x + y;
}

const go3 = (x: number, y: number): number => x + y;

const go4 = (obj: { name: string; age: number }): string => {
    const {name, age} = obj;
    return `${name} is ${age} years old `;

}; // go4({name:'morty', age:14})...

// Passing function as prop in React:
interface ReactProp {
    propName: (param1: string, param2: number) => void;
}

// returning promises
const fetchData = (url: string): Promise<string> => {
    return Promise.resolve(`Data from ${url}`)
}
// taking functions as parameters
type callbackFunc = (num: number) => void;

function printToFile(text: string, callback: callbackFunc): void {
    console.log(text)
    callback(4)
}

// types for closure:
type adderFunc = (v: number) => number

function createAdder(num: number): adderFunc { //So this is a function that takes a number and returns an adder function
    return (val: number) => num + val;
}

const addOne = createAdder(1)
console.log(addOne(5)) // prints 6...

// function overloading:
interface Coordinate {
    x: number;
    y: number
}

function parseCoordinate(str: string): Coordinate;
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
/* the type "unknown" is like any, but you have to cast it before you use it*/
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
    let coord: Coordinate = {
        x: 0,
        y: 0,
    }
    /* note that typeof checks during runtime, NOT compiletime. the type will
    be object because its javascript checking and NOT typescript */
    if (typeof arg1 === 'string') {
        (arg1 as string).split(",").forEach((str) => {
            const [key, value] = str.split(":");
            coord[key as "x" | "y"] = parseInt(value, 10)
        })
    } else if (typeof arg1 === 'object') {
        coord = {
            ...(arg1 as Coordinate)
        }
    } else {
        coord = {
            x: arg1 as number,
            y: arg2 as number,
        }
    }
    return coord;
}

console.log(parseCoordinate(10, 20))
console.log(parseCoordinate("x:12,y:7"))
console.log(parseCoordinate({x: 5, y: 6}))
