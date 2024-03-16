import { IPokemonData } from "../Interfaces/Interfaces";


export const GetPokemonData = async (pokemon: string | number) => {
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const data: IPokemonData = await promise.json();
    console.log(data);
    return data;
}
