// screw this:
// class Doggy {
//     public name: string = "";
//     public age:number =0;
//     constructor(name:string, age:number) {
//         this.name = name;
//         this.age=age;
//     }
// }
// do this:
class Doggy {
    constructor(public readonly name: string, public readonly age: number) { // public makes it a public property like in the example above, readonly makes it readonly =]
    }
}

const doge = new Doggy("Lassy",2)
console.log(doge.name);

// The static members of a class are accessed using the class name and dot notation, without creating an object. static properties will not be accessible from the class instances.

// Lets make a dog list. This will be a singleton dog list, the one and only canonical dog-list, without the option of creating others
class DogList {
    private doggies:Doggy[]=[];

    static instance:DogList = new DogList(); // allows me to see the list like so: DogList.instance;

    private constructor(){} // makes sure no one can write something like const dl = new DogList() (outside the class itself)

    static addDog (dog:Doggy){
        DogList.instance.doggies.push(dog)
    } // example use in lines 38,39 (no need to write .instance)

    getDogs(){
        return this.doggies
    } // example use in line 40 (this is public, so we need to write .instance)
}

DogList.addDog(doge)
DogList.addDog({name:'wishbone',age:5})
console.log(DogList.instance.getDogs())
