import { GetEvolutionImg } from "../Data/DataService";
import { IEvolutions } from "../Interfaces/Interfaces";

export const GetEvolutionArray = (data: IEvolutions) => {
  let evolArr: (string | number)[][] = [];
  let imgArr: string[] = [];

  if (data.chain.evolves_to.length !== 0) {
    data.chain.evolves_to.map((key) => {
      let arr: (string | number)[] = [];
      arr.push(data.chain.species.name);
      if (key.species.name === "wormadam") {
        arr.push(413);
      } else {
        arr.push(key.species.name);
      }
      evolArr.push(arr);
    });
    if (data.chain.evolves_to.every((ev) => ev.evolves_to.length !== 0)) {
      for (let i = 0; i < data.chain.evolves_to.length; i++) {
        data.chain.evolves_to[i].evolves_to.map((vol) => {
          let arr2 = [];
          arr2.push(data.chain.evolves_to[0].species.name);
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
  console.log(evolArr);
  console.log(imgArr);
  return imgArr;
};
