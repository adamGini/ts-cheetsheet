//-------------tuples:
/*
A tuple is a TypeScript type that works like an array with some special considerations:

The number of elements of the array is fixed.
The type of the elements is known.
The type of the elements of the array need not be the same.

a react state is a tuple, its an array, we know that it has 2 values, the first one is the value, the second one is the function we call to shcange that value.
*/
type ThreeDCoordinate = [x: number, y: number, z: number]; // ThreeDCoordinate is a tuple
function add3DCoordinates(c1: ThreeDCoordinate, c2: ThreeDCoordinate): ThreeDCoordinate {
    return [
        c1[0] + c2[0],
        c1[1] + c2[1],
        c1[2] + c2[2],
    ]
}

console.log('--------tuples-----------')
console.log(add3DCoordinates([0, 0, 0], [10, 20, 30]))

// making a simple string state with tuples and closure:
function simpleStringState(
    initial: string
): [() => string, (v: string) => void] {
    let str: string = initial;
    return [
        () => str,
        (v: string) => {
            str = v;
        },
    ];
}

const [str1getter, str1setter] = simpleStringState("hello");
console.log(str1getter());
str1setter("goodbye");
console.log(str1getter());
