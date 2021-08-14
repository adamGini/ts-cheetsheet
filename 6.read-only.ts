// lets make a cat:
interface Cat {
    name: string,
    breed: string
}

function makeCat(name: string, breed: string): Cat {
    return {
        name,
        breed
    }
}

const pepper = makeCat("Pepper", "Tabby")

// obviously, all these things are completely muteable. lets make sure you can't change the cat breed:

interface CatWithConstantBreed {
    name: string,
    readonly breed: string
}

// lets make a type were all the cats properties are entirely immutable:
type ReadOnlyCat = Readonly<Cat>

// Another usecase, lets say we want a function that takes in some numbers and returns a tuple of coordinates. We want to keep that
// tuple immutable as it represents a real spot.

function makeCoordinate(x: number, y: number, z: number): readonly[number, number, number] {
    return [x, y, z]
}

const c1 = makeCoordinate(6,40,1023)
// c1[0]=2 uncomment and see the error

// ----------- total immutability:
// So in javascript we can do like so:

const arrOfNums = [1,2,3,4];
// It will forever be a an array, but its values can totally be changed like so:

arrOfNums[0]=60;

// typescript allows us to make the entire array (or object or whatever), together with its values to be all immutable:

const reallyConst = [1,2,3,4] as const;
//reallyConst[0]=60; uncomment to see the error
