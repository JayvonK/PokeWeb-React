export interface IPokemonData {
  abilities: IAbilityObject[];
  id: number;
  moves: IMovesObject[];
  species: {
    name: string;
    url: string;
  };
  sprites: ISpritesObject;
  types: ITypesObject[];
}

export type PokeEncountersURL = PokeEncountersObject[];

export type PokeLocationData = PokeLocationObject;

export interface IFlavorText {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: FlavorObject[];
}

export interface IEvolutions {
  chain: IEvolutionObject
}

export interface IPokeColor {
  color: {
    name: string
  }
}

interface IEvolutionObject {
  evolves_to: IEvolutionObject[];
  species: {
    name: string;
  }
}

type PokeLocationObject = {
  location: {
    name: string;
  };
  names: NamesObject[];
};

type NamesObject = {
  language: {
    name: string;
  };
  name: string;
};

type FlavorObject = {
  flavor_text: string;
};

type PokeEncountersObject = {
  location_area: {
    url: string;
  };
};

interface IAbilityObject {
  ability: {
    name: string;
  };
}

interface IMovesObject {
  move: {
    name: string;
  };
}

interface ITypesObject {
  type: {
    name: string;
  };
}

interface ISpritesObject {
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
  versions: {
    "generation-v": {
      "black-white": {
        animated: {
          front_default: string;
        };
      };
    };
  };
}
