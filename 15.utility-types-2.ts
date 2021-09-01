// ----------------- Parameters and ReturnTypes

type Name = {
    first: string;
    last: string;
}

function addFullName(name: Name): Name & { fullName: string } { // this is the iteratorFunc
    return {
        ...name,
        fullName: `${name.first} ${name.last}`
    }
}

function permuteRows<T extends (...args: any[]) => any>(iteratorFunc: T, data: Parameters<T>[0][]): ReturnType<T>[] {
    // console.log('----', data)
    return data.map(iteratorFunc)
}

/*
*  lets explain line 15:
*  permuteRows accepts a generic type (T). however, that type MUST be a function, which is why we told it to extend (...args: any[]) => any, this is basically the type of
*  any function ever. this type applies to every single function in the world. it accepts any amount of parameters of any type and return anything..
*
*  as for the parameters, this function will take 2: the first is an iterator function (in our case the addFullName which is of type T (defined earlier in this comment)
*  the second is an array of data which we will provide manually (line 35). the type of this data is defined (using the Parameters utility type) as the parameters of T.
*  i.e the parameters of the function, so, 'first' and 'last'. the reason we only want the position[0] is because we just want the TYPE here, every element of the array will
*  have the same type, we dont need them all.
*  however, the type of the DATA is an array (see line 35), which is why the second [].
*
*  as for the return type, we are using the ReturnType utility array to say that the permuteRows function returns the same type as T - the addFullName retun type -
*  i.e Name & { fullName: string } as defined in line 8.
*/

console.log(permuteRows(addFullName, [{first: 'Adam', last: 'Lerman'}, {first: 'John', last: 'Doe'}]));

//-------------- ConstructorParameters and InstanceType. This is kinda the same, but for classes and constructors

class PersonWithFullName {
    constructor(public name: Name){}

    get fullName(){
        return `${this.name.first} ${this.name.last}`
    }
}

function createObjects<T extends new (...args: any[]) => any>(klass:T,data: ConstructorParameters<T>[0][]):InstanceType<T>[] { // klass because we cant use the word class...
    // note that T here is defined the same way as earlier, but with the addition of the word 'new', because its not a function, its a constructor
    return data.map(item => new klass(item));
}

console.log('instances:',createObjects(PersonWithFullName, [{first: 'Rick', last: 'Sanchez'}, {first: 'Jain', last: 'Doe'}]));
console.log('full names:',createObjects(PersonWithFullName, [{first: 'Rick', last: 'Sanchez'}, {first: 'Jain', last: 'Doe'}])
    .map(obj=>obj.fullName)
);
