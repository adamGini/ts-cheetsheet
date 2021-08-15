//---------------- Member Visibility

/* There are three member visibility setting:
* 1. Private - only this class can see it and change it
* 2. Protected - this class and any of its descendants
* 3. Public - free for all
* */

// Lets create a simple database:

interface Database {
    get(id: string): string;

    set(id: string, value: string): void
}

class InMemoryDatabase implements Database {
    private db: Record<string, string> = {}

    get(id: string): string {
        return this.db[id]
    }

    set(id: string, value: string): void {
        this.db[id] = value;
    }
}

const myDB = new InMemoryDatabase();
myDB.set("foo", "bar"); // this is the correct way to do this, using the setter
//myDB.db['foo']="baz"; // this is the incorrect way to do this, as it does not go through the setter, its completely manual. This is why we set the db to be private.
console.log(myDB.get("foo"))

//extends:
console.log('------ extends --------');

// lets make a new database:

interface Database2 {
    get(id: string): string;

    set(id: string, value: string): void
}

interface Persistable {
    saveToString(): string;

    restoreFromString(storedState: string): void;
}

class InMemoryDatabase2 implements Database2 {
    protected db: Record<string, string> = {} // in this case we used protected, because there is a different class extending this one and we need that class to be able to access this db aswell
    get(id: string): string {
        return this.db[id]
    }

    set(id: string, value: string): void {
        this.db[id] = value;
    }
}

const myDB2 = new InMemoryDatabase2();
myDB2.set("foo", "bar");
console.log(myDB2.get("foo"))

class PersistentMemoryDB extends InMemoryDatabase2 implements Persistable {
    saveToString(): string {
        return JSON.stringify(this.db)
    }

    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState)
    }
}

const myDB3 = new PersistentMemoryDB();
myDB3.set("meaning", "42");
console.log(myDB3.get("meaning"))
console.log(myDB3.saveToString())

// now lets use the restoreFromString method:

const myRestoredDb = new PersistentMemoryDB();
const savedData = myDB3.saveToString()
myDB3.set("meaning", "6")
console.log('my db 3 AFTER saving data: ', myDB3.get("meaning"))

myRestoredDb.restoreFromString(savedData);
console.log('from restored db: ', myRestoredDb.get("meaning"))

// we can see by the fact that the 2 databases are showing different values for the same id ("meaning") that the data does indeed persist and that the two dbs are infact separate