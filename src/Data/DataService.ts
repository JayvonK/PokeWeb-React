const GetPokemonData = async (pokemon: string | number) => {
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const data = await promise.json();
}
export {}