// Full list of utility types here: https://www.typescriptlang.org/docs/handbook/utility-types.html

//------------------------------- partial
interface MyUser {
    name: string;
    id: string;
    email?: string;
}

interface MyUserOptionals {
    name?: string;
    id?: string;
    email?: string;
}

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
    return {
        ...user, // initial data
        ...overrides // the data coming from here will overrdie the initial data so long as the property names are the same
    }
}
const user: MyUser = {
    name: 'Hunter S Thompson',
    id: "gonzo",
    email: "hsm@gmail.com"
}

const updatedUser = merge(user, {email: "newEmail@gmail.com"})
console.log(updatedUser)

// This works, but in this case every time we add something to the original type, we have to update the optional type.
// Easier to use the Partial utility type which takes in an existing type and makes everything optional, like so:

type MyUserOptionalEasierWay = Partial<MyUser> // hover to see its all optional

//-------------------------------required
// Basically the opposite of Partial, it takes in an existing type and makes everything required:
 type MyUserRequired = Required<MyUser> // hover to see its all required

//----------------------pick
type JustEmailAndName = Pick<MyUser,"email" |'name'>
const example:JustEmailAndName = {name:"foobar"} // note that email is still optional, as in the original type (MyUser)

//------------------omit
// The opposite of pick

type JustEmailAndNameByOmit = Omit<MyUser,"id">
const example2:JustEmailAndNameByOmit = {name:"foo", email:"bar"}

// ---------------Record
// As shown in the basics file, this will take the type of the propertie/key and the type of the value like so:

type ObjOfString = Record<string,string>
const objOfStrings: ObjOfString = {
    name:"foo",
    id:"bar",
    email:"baz"
}

// But we can also use it in combination with any of the utility types, or interfaces like so:

type MyUserObj = Record<string,Omit<MyUser,"id">>
const arrOfUsers:MyUserObj={
    one:{name:"foo",email:"bar"},
    two:{name:"baz"}
}

// we can also tell Record WHERE to take the type FROM:
type MyUserObj2 = Record<MyUser['name'],number>
const objOfNumbers = {
    "one":1,
    "two":2
}
// MyUser['name'] does NOT refer to the name, but to the type of name, in our case its a string. If the name type were to change,
// the above Record would change together with it.