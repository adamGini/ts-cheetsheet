// Code copied from the last classes file in order to implement it with generic types
interface DatabaseA<T,K> {
    get(id: K): T;

    set(id: K, value: T): void
}

interface PersistableA {
    saveToString(): string;

    restoreFromString(storedState: string): void;
}

type DBKeyType = string |number |symbol; // On line 16 we define a Record, the key type for that MUST be one of these

class InMemoryDatabaseA<T,K extends DBKeyType> implements DatabaseA<T,K> {
    protected db: Record<K, T> = {} as Record<K, T>// initialising with 'as' because its an empty object and ts wont know otherwise
    get(id: K): T {
        return this.db[id]
    }

    set(id: K, value: T): void {
        this.db[id] = value;
    }
}

class PersistentMemoryDBA<T,K extends DBKeyType> extends InMemoryDatabaseA<T,K> implements PersistableA {
    saveToString(): string {
        return JSON.stringify(this.db)
    }

    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState)
    }
}
// Below is pretty much the same but this time with generics

const myDBB = new PersistentMemoryDBA<number,string>();
myDBB.set("number", 42);
console.log(myDBB.get("number"))
console.log(myDBB.saveToString())

// now lets use the restoreFromString method:

const myRestoredDbA = new PersistentMemoryDBA<number,string>();
const savedDataA = myDBB.saveToString()
myDBB.set("number",6)
console.log('my db B AFTER saving data: ',myDBB.get("number"))

myRestoredDbA.restoreFromString(savedDataA);
console.log('from restored db: ', myRestoredDbA.get("number"))

// we can see by the fact that the 2 databases are showing different values for the same id ("meaning") that the data does indeed persist and that the two dbs are infact separate