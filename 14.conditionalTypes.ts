// simple example from the typescript manual

interface Animal {
    live(): void;
}

interface Dog extends Animal {
    woof(): void;
}

type Example1 = Dog extends Animal ? number : string;

//type Example1 = number

type Example2 = RegExp extends Animal ? number : string;

//type Example2 = string

// jacks example
import fetch from "node-fetch"

// pokemon api "https://pokeapi.co/api/v2/pokemon?limit=10"

interface PokemonResults {
    count: number;
    next?: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}

type fetchURLReturn<T> = T extends undefined ? Promise<PokemonResults> : void;

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
    url: string,
    cb?: T
): fetchURLReturn<T> {
    if (cb) {
        fetch(url)
            .then((data) => data.json())
            .then(cb);
        return undefined as fetchURLReturn<T>;
    } else {
        return fetch(url).then((data) => data.json()) as fetchURLReturn<T>; // regular syntax for type coercion (as)
    }
}

fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
  data.results.forEach(({ name }) => console.log(name));
});
//
// (async function () {
//     const data = <PokemonResults>(// generic syntax for type coercion
//         await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10")
//     );
//     data.results.forEach(({ name }) => console.log(name));
// })();