// function creating functions

function myLogFunction() {
    return (str:string) => {
        console.log(str)
    }
}

const logger = myLogFunction()
logger('words')

function createLoggerClass() {
    return class MyLoggerClass {
        private completeLog: string = "all the logs from the class: \n"; // will keep a record of all the things you have logged
        log(str: string) {
            console.log(str) // logging
            this.completeLog += str + '\n' //adding what was logged to the complete loggs
        }

        dumplog() {
            return this.completeLog;
        }
    }
}

const MyLogger = createLoggerClass()
const logger2 = new MyLogger()
logger2.log('foo')
logger2.log('bar')
console.log(logger2.dumplog())

// function creating a generic class
function CreateSimpleMemoryDatabase<T>() {
    return class simpleMemoryDatabase {
        private db: Record<string, T> = {}

        set(id: string, value: T) {
            this.db[id] = value;
        }

        get(id: string) {
            return this.db[id];
        }

        getObject(): object {
            return this.db;
        }
    }
}

const StringDB = CreateSimpleMemoryDatabase<string>();
const sdb1 = new StringDB()
sdb1.set("a", "hello")

// creating a mixin
type Constructor<G> = new (...args: any[]) => G;

function Dumpable<T extends Constructor<{ getObject(): object }/*<-this will be G*/>>(Base: T) { // Dumpable can only be applied to classed that have a getObject method on them
    return class Dumpable extends Base {
        dump() { // <----------------------------- this is the functionality we want to mix in to the original class. we are adding the functionality of dumping the db to the console
            console.log(this.getObject())
        }
    }
}

const DumpableStringDatabase = Dumpable(StringDB); // so in this usecase, lets say someone else wrote the StringDB class and we just want to mixin the dump functionality to it
const sdb2 = new DumpableStringDatabase()
sdb2.set("jack", "hello jack")
sdb2.dump()