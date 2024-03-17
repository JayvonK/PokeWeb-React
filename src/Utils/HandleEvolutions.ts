import { GetEvolutionImg } from "../Data/DataService";
import { IEvolutions, IFlavorText, IPokemonData } from "../Interfaces/Interfaces";

export const GetEvolutionArray = async (pokemon: string | number) => {

    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const data: IPokemonData = await promise.json();   
    const promise2 = await fetch(data.species.url);
    const data2: IFlavorText = await promise2.json();
    const promise3 = await fetch(data2.evolution_chain.url);
    const data3: IEvolutions = await promise3.json();
    
  let evolArr: (string | number)[][] = [];
  let imgArr: string[] = [];

  if (data3.chain.evolves_to.length !== 0) {
    data3.chain.evolves_to.map((key) => {
      let arr: (string | number)[] = [];
      arr.push(data3.chain.species.name);
      if (key.species.name === "wormadam") {
        arr.push(413);
      } else {
        arr.push(key.species.name);
      }
      evolArr.push(arr);
    });
    if (data3.chain.evolves_to.every((ev) => ev.evolves_to.length !== 0)) {
      for (let i = 0; i < data3.chain.evolves_to.length; i++) {
        data3.chain.evolves_to[i].evolves_to.map((vol) => {
          let arr2 = [];
          arr2.push(data3.chain.evolves_to[0].species.name);
          arr2.push(vol.species.name);
          evolArr.push(arr2);
        });
      }
    }
  }
  evolArr.map((ev) => {
    ev.map(async (p) => {
      imgArr.push(await GetEvolutionImg(p));
    });
  });
  return imgArr;
};
