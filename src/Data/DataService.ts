import { IFlavorText, IPokemonData, PokeEncountersURL, PokeLocationData,  } from "../Interfaces/Interfaces";


export const GetPokemonData = async (pokemon: string | number) => {
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const data: IPokemonData = await promise.json();
    console.log(data);
    return data;
}

export const GetPokemonLocationData = async (id: string | number) => {
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + id + "/encounters");
    const data: PokeEncountersURL = await promise.json();
    if(data.length !== 0){
    const promise2 = await fetch(data[0].location_area.url);
    const data2: PokeLocationData = await promise2.json();
    return data2;
    }else {
        const NA_Location: PokeLocationData = {
            location: {
              name: "N/A",
            },
            names: [
              {
                language: {
                  name: "",
                },
                name: "N/A",
              },
            ],
          };
          return NA_Location
    }
}

export const GetFlavorText = async (pokemon: string | number) => {  
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const data: IPokemonData = await promise.json();   
    const promise2 = await fetch(data.species.url);
    const data2: IFlavorText = await promise2.json();
    return data2;
}
