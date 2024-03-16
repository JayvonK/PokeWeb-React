interface IPokemonData {
    abilities: IAbilityObject[]
    location_area_encounters_URL: string
    moves: IMovesObject[]
}

interface IAbilityObject {
        ability: {
            name: string
        }
}

interface IMovesObject {
        move: {
            name: string
        }
}
export{}