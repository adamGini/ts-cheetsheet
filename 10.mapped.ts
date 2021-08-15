// lets create a flexible model for storing information about dogs. The name will be required, everything else will be optional.

// This is one way of doing it:
// type MyFlexibleDogInfo = {
//     name:string;
// } & Record<string,string>

// Here's another:
type MyFlexibleDogInfo = {
    name: string;
    [key: string]: string | number; // Note this syntax, its this syntax that allows us to map types
}

const dog: MyFlexibleDogInfo = {
    name: "bob",
    breed: "mutt",
    age: 4
}

interface DogInfo {
    name: string;
    age: number;
}

type OptionsFlags<type> = {           // code taken from the handbook: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
    [Property in keyof type]: boolean // <- this is how to map types
} // so this will take all the properties from the given type and make them all of the type boolean

type DogInfoOptions = OptionsFlags<DogInfo>; // this type is mapped

// lets have a practical example:

type Listeners<Type> = {
    [Property in keyof Type as`on${Capitalize<string & Property>}Change`]: (newValue:Type[Property]) => void; // note the use of another utility type Capitalize, it capitalizes the first letter
} & { // creating some more listeners
    [Property in keyof Type as`on${Capitalize<string & Property>}Delete`]?: () => void; // the '?' just makes it optional...
}

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
    throw "needs to be implements";
}

const church: DogInfo = {
    name: "church",
    age: 6
}

type DogInfoListeners = Listeners<DogInfo> // Unnecessary line here, written just in order to hover over and see the types.

listenToObject(church, {
    onNameChange: (v: string) => {},
    onAgeChange: (v: number) => {},
    onAgeDelete:()=>void{},
    onNameDelete:()=>{}
})