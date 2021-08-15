// an abstract class is a class that one can never make an instance of. We don't want anyone to make an instance of StreetFighter, we only want instances of classes that extend it
abstract class StreetFighter {
    constructor() {
    }
    move() {
    }
    fight() {
        console.log(`${this.name} attacks with ${this.getSpecialAttack()}`)
    }
    abstract getSpecialAttack(): string; // abstract methods cannot have an implementation
    abstract get name():string;
}


class Ryu extends StreetFighter{
    getSpecialAttack():string{
        return "Haduken!";
    }
    get name():string{
        return 'Ryu'
    }
}

const ryu = new Ryu()

console.log(ryu.getSpecialAttack())
ryu.fight()