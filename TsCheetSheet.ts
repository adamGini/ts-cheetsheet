// Basic types are unnecessary to anotate, ts infers these types - no need to fuss.
// use all lowercase when anotating types. uppercase are a different thing.

const num: number = 6;
const str: string = "foo";
const bool: boolean = true;
const obj: object = {};
const arr: object[] = [{}, {}];

//----------- anotating functions:

function go2(x: number, y: number): number {
  return x + y;
}

const go3 = (x: number, y: number): number => x + y;

const go4 = (obj: { name: string; age: number }): string => {
  const { name, age } = obj;
  return `${name} is ${age} years old `;

  // Passing function as prop in React:
  interface ReactProp{
    method:(param1:string, param2:number)=>void;
  }


}; // go4({name:'morty', age:14})...

//----------- optional properties

function printName(obj: { first: string; last?: string }) {
  console.log(obj.first);
  if (obj.last !== undefined) console.log(obj.last);
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

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

printCoord({ x: 100, y: 100 });

// differences are mostly about more advanced uses, can be found here:
//https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

//------------ type assertion:

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
//or
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

//------------ literal types:
//this is a way to assert a SPECIFIC string/number, like a constant.

let x: "hello" = "hello";
// OK
x = "hello";
// hover over the x to see: Type '"howdy"' is not assignable to type '"hello"'.
x = "howdy";

// not very useful in itfelf, btu can be useful when combined with other type literals in union types, like a function that only
// acceopts a certain set of known values:

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");

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

type ObjOfNum = Record<string,number>
const obj2:ObjOfNum = {
  foo:6,
  bar:12,
  baz:24
}

