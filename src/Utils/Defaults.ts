import { IEvolutions, IFlavorText, IPokemonData, PokeLocationData } from "../Interfaces/Interfaces"

export const pokeDataDefault: IPokemonData = {
    abilities: [{
        ability: {
            name: "N/A"
        }
    }],
    id: 1,
    moves: [{
        move: {
            name: "N/A"
        }
    }],
    species: {
        name: "N/A",
        url: "N/A",
    },
    sprites: {
        other: {
            "official-artwork": {
                front_default: "N/A",
                front_shiny: "N/A"
            }
        },
        versions: {
            "generation-v": {
                "black-white": {
                    animated: {
                        front_default: "N/A",
                    }
                }
            }
        }
    },
    types: [{
        type: {
            name: "N/A"
        }
    }],
}

export const pokeLocationDataDefault: PokeLocationData = {
    location: {
        name: "N/A"
    }, 
    names: [
        {
            language: {
                name: "N/A"
            },
            name: "N/A"
        }
    ]
}

export const pokeFlavorDefault: IFlavorText = {
    evolution_chain: {
        url: "N/A"
    },
    flavor_text_entries: [
        {
            flavor_text: "N/A"
        }
    ]
}

export const evolutionDataDefault: IEvolutions = {
    chain: {
        evolves_to: [{
            evolves_to: [],
            species: {
                name: "N/A"
            }
        }],
        species: {
            name: "N/A"
        }

    }
}