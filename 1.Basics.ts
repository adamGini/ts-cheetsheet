// npm init -> npm i typescript -> npm i ts-node -> npx tsc --init
//in order to run with ts use terminal - npx ts-node tsCheatSheet

// The stuff below is taken from the ts handbook and this youtube playlist:
//https://www.youtube.com/playlist?list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n
// Basic types are unnecessary to anotate, ts infers these types - no need to fuss.
// use all lowercase when anotating types. uppercase are a different thing. (i.e write "string" NOT "String")

const num: number = 6;
const str: string = "foo";
const bool: boolean = true;
const obj: object = {};
const arr: object[] = [{}, {}];
//---------- keyof
// Allows you to use the keys of an object as a literal type. If used on an array the literal type will be a number
interface Person {
    age:number;
    role:string;
}
interface SanchezFamily {
    morty:Person;
    summer:Person;
    jerry:Person;
    beth:Person;
    rick:Person;

}
type FamilyMember = keyof SanchezFamily

const sanchezFamily:SanchezFamily = {
    morty:{
        age:14,
        role:'son'
    },
    summer: {
        age:17,
        role:'daughter'
    },
    jerry:{
        age:45,
        role:'father'
    },
    beth: {
        age:45,
        role:'mother'
    },
    rick:{
        age:66,
        role:'grandfather'
    }
}


const children:FamilyMember[] = ['morty','summer']


//----------- optional properties

// NOTE: optional prop/s must be at the end of the parameters, once one is optional - you cant have required ones after it.

function printName(obj: { first: string; last?: string }) {
    console.log(obj.first);
    if (obj.last !== undefined) console.log(obj.last);
}

// Both OK
printName({first: "Bob"});
printName({first: "Alice", last: "Alisson"});

//for interface:
interface WithOptionalFields {
    id: number,
    name: string,
    hobbies?: string
}

// when a callback is optional:

function withOptionalCallback(x: number, y: number, callback?: () => void) {
    console.log(x + y);
    callback?.(); // so, first we check that we did get a callback, then we use it
}

//----------- union types: a type formed from two or more other types.
// note that only the methods that both types have in common will be usable. so in a union of a number and string type, toLowerCase()
// will not be available. but in the union or a string and array, slice() will be.
function printId(id: number | string) {
    console.log("Your ID is: " + id);
}

//------- type aliases:
type Point = {
    x: number;
    y: number;
};

type ID = number | string;

//-------- interfaces - prefer these over type alias
interface Pointy {
    x: number;
    y: number;
}

function printCoord(pt: Pointy) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord({x: 100, y: 100});

// differences are mostly about more advanced uses, can be found here:
//https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

//------------ type assertion: (commented because it breaks the code)

//const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement; <-syntax 1
//or
//const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas"); <- syntax 2

//------------ literal types:
//this is a way to assert a SPECIFIC string/number, like a constant.

let x: "hello" = "hello";
// OK
x = "hello";
// uncomment and hover over the x to see: Type '"howdy"' is not assignable to type '"hello"'.
//x = "howdy";

// not very useful in itfelf, but can be useful when combined with other type literals in union types, like a function that only
// accepts a certain set of known values:

function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
}

printText("Hello, world", "left");
printText("G'day, mate", "center");

// Numeric literal types work the same way:
function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}

//------------ null and undefined:
//assuming strictNullChecks is on in ts.config, Writing ! after any expression is effectively a type assertion that
//the value isn’t null or undefined

function liveDangerously(x?: number | null) {
    // No error
    console.log(x!.toFixed());
}

// left off here: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums

// Record - example of a usecase is an object full of numbers:
//left side is the property type, right side is the value type

type ObjOfNum = Record<string, number> // Record is a utility type, more on those in the utility type file
const obj2: ObjOfNum = {
    foo: 6,
    bar: 12,
    baz: 24
}


