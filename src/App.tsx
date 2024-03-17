"use client";
import React, { useEffect } from "react";
import "./App.css";
import { Modal } from "flowbite-react";
import { useState } from "react";
import {
  GetEvolutionData,
  GetEvolutionImg,
  GetFlavorText,
  GetPokemonData,
  GetPokemonLocationData,
} from "./Data/DataService";
import {
  IEvolutions,
  IFlavorText,
  IPokemonData,
  PokeLocationData,
} from "./Interfaces/Interfaces";
import { GetEvolutionArray } from "./Utils/HandleEvolutions";

import pokeBall from './Assets/pokeball.png';
import heartOutline from './Assets/heartoutline.png';
import favIcon from './Assets/icons8-heart-96 (1).png';
import magnifyingGlass from './Assets/icons8-magnifying-glass-128.png'
import random from './Assets/icons8-random-100.png';
import squirtle from './Assets/squirtle.png';
import shinySquirtle from './Assets/shiny squirtle.png';

function App() {
  const [count, setCount] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [pokeData, setPokeData] = useState<IPokemonData>();
  const [pokeFlavor, setPokeFlavor] = useState<IFlavorText>();
  const [pokeLocationData, setPokeLocationData] = useState<PokeLocationData>();
  const [searchName, setSearchName] = useState<string | number>("1");
  const [evolutionData, setEvolutionData] = useState<IEvolutions>();
  const [evolutionArray, setEvolutionArray] = useState<(string | number)[][]>();
  const [evolImgArray, setEvolImgArray] = useState<string[]>([]);

  const handleCount = () => {
    setCount(count + 1);
    evolutionData && console.log(GetEvolutionArray(evolutionData));
  };

  const handleChange = (value: string | number) => {
    setSearchName(value);
  };

  const handleKeyDown = (value: string) => {
    if (value === "Enter") {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    const InitPokeFetch = async (value: string | number) => {
      setPokeData(await GetPokemonData(value));
      setPokeLocationData(await GetPokemonLocationData(value));
      setPokeFlavor(await GetFlavorText(value));
      setEvolutionData(await GetEvolutionData(value));
    };
    InitPokeFetch(searchName);
  }, [count]);

  return (
    <div className=" bg-pokeBlue">
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setOpenModal(false)}>I accept</button>
          <button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </button>
        </Modal.Footer>
      </Modal>

      <img className="pokeBall opacity-5" src={pokeBall} alt="" />
      <h1 className="md:block verticalWord text-white chakra text-3xl drop-shadow-lg hidden">
        Click the pokemon!
      </h1>
      <div className="grid grid-rows-1 2xl:px-40 lg:px-28 pl-10 md:pt-14">
        <div className="grid 2xl:grid-cols-2 2xl:grid-rows-none grid-rows-2">
          <div className="2xl:w-[650px] flex items-center">
            <h1 className="md:text-[128px] md:w-[640px] text-6xl chakraBold text-white drop-shadow-lg">
              POKEWEB
            </h1>
          </div>
          <div className="md:flex md:items-center">
            <input
              className="2xl:w-[405px] xl:w-[800px] md:w-[405px] md:h-[93px] w-[280px] h-[56px] chakra md:text-3xl text-[24px]"
              type="text"
              name=""
              placeholder="Search for Pokemon"
              onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
            />
            <div className="flex md:justify-around justify-between md:w-full w-[250px] md:mt-0 mt-5">
              <button type="button" onClick={handleCount} className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-24 w-[56px] rounded-3xl">
                <img
                  className="p-2"
                  src={magnifyingGlass}
                  alt=""
                />
              </button>
              <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-24 w-[56px] rounded-3xl">
                <img
                  className="p-2"
                  src={random}
                  alt=""
                />
              </button>
              <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-24 w-[56px] rounded-3xl" onClick={() => setOpenModal(true)}>
                <img className="p-2" src={favIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-1 mt-12">
        <div className="2xl:grid 2xl:grid-cols-2">
          <div>
            <div className="2xl:pl-40 2xl:flex 2xl:justify-start flex justify-center">
              <img
                className="md:w-[550px] h-auto w-72 cursor-pointer transition duration-300 hover:scale-110"
                src={pokeData && pokeData.sprites.other["official-artwork"].front_default}
                alt=""
              />
              <img
                className="md:w-[550px] h-auto w-[330px] transition duration-300 hover:scale-110 hidden"
                src={shinySquirtle}
                alt=""
              />
            </div>
            <div className="pl-40 2xl:block hidden w-[80%]">
              <h2 className="text-4xl chakra text-white drop-shadow-lg">
              {pokeFlavor?.flavor_text_entries[0].flavor_text}
              </h2>
            </div>
          </div>
          <div className="2xl:grid 2xl:grid-cols-[55%_45%] 2xl:mx-0 lg:mx-60 md:mx-20 mx-10">
            <div>
              <h1 className="md:hidden text-2xl chakra text-white text-center mt-3 my-5 drop-shadow-lg">
                Click the pokemon!
              </h1>
              <h1 className="md:text-4xl text-[24px] chakraBold text-white mb-6 drop-shadow-lg">
              {pokeData && pokeData.id}
              </h1>
              <h1 className="h-auto md:text-6xl text-[40px] chakraBold flex text-white items-center mb-6">
                <span className="drop-shadow-lg">{pokeData && pokeData.species.name}</span>{" "}
                <button className="ml-5 transition duration-300 hover:scale-105">
                  <img
                    className="md:w-auto w-[40px]"
                    src={heartOutline}
                    alt="heart outline"
                  />
                </button>
              </h1>
              <div className="mb-6 text-3xl text-white">
                <button className="bg-water rounded-[50px] drop-shadow-lg">
                  <p className="px-4 py-2 chakraBold md:text-3xl text-2xl">
                  {pokeData && pokeData.types.map((t) => t.type.name + " ")}
                  </p>
                </button>
              </div>
              <h1 className="md:text-4xl text-[24px] chakraBold text-white mb-10 drop-shadow-lg">
                Location: <span className="chakra">{pokeLocationData && pokeLocationData.names[0].name}</span>
              </h1>
              <h1 className="md:text-4xl text-[24px] chakraBold text-white mb-10 drop-shadow-lg">
                Abilities: <span className="chakra">{pokeData && pokeData.abilities.map((ab) => ab.ability.name + " | ")}</span>
              </h1>
              <h1 className="md:text-4xl text-[24px] chakraBold text-white mb-10 drop-shadow-lg h-72 overflow-y-auto">
                Moves:{" "}
                <span className="chakra">
                {pokeData && pokeData.moves.map((m) => m.move.name + " | ")}
                </span>
              </h1>
            </div>
            <div className="2xl:hidden md:my-24 my-12">
              <h2 className="md:text-4xl text-[24px] chakra text-white drop-shadow-lg">
              {pokeFlavor?.flavor_text_entries[0].flavor_text}
              </h2>
            </div>
            <div className="2xl:pl-8">
              <h1 className="md:text-4xl text-[24px] chakraBold text-white drop-shadow-lg md:mb-12 mb-6">
                Evolutions
              </h1>
              <div className="mb-8 2xl:h-[700px] 2xl:overflow-y-auto">
                <div className="flex justify-start items-center md:mb-8 mb-4">
                  <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-28 md:h-28 w-20 h-20 rounded-[50px] flex justify-center items-center">
                    <img
                      className="md:w-20 w-12"
                      src="./assets/evol 1.gif"
                      alt=""
                    />
                  </button>
                  <img
                    className="w-12 md:mx-10 mx-5"
                    src="./assets/ArrowRight.png"
                    alt=""
                  />
                  <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-28 md:h-28 w-20 h-20 rounded-[50px] flex justify-center items-center">
                    <img
                      className="md:w-20 w-12"
                      src="./assets/evol 2.gif"
                      alt=""
                    />
                  </button>
                </div>
                <div className="flex justify-start items-center md:mb-8 mb-4">
                  <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-28 md:h-28 w-20 h-20 rounded-[50px] flex justify-center items-center">
                    <img
                      className="md:w-20 w-12"
                      src="./assets/evol 2.gif"
                      alt=""
                    />
                  </button>
                  <img
                    className="w-12 md:mx-10 mx-5"
                    src="./assets/ArrowRight.png"
                    alt=""
                  />
                  <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-28 md:h-28 w-20 h-20 rounded-[50px] flex justify-center items-center">
                    <img
                      className="md:w-20 w-12"
                      src="./assets/evol 3.gif"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
      />
      <button type="button" onClick={handleCount}>
        Search
      </button>
      <h1>ID: {pokeData && pokeData.id}</h1>
      <h1>Name: {pokeData && pokeData.species.name}</h1>
      <h1>Type: {pokeData && pokeData.types.map((t) => t.type.name + " ")}</h1>
      <h1>Location: {pokeLocationData && pokeLocationData.names[0].name}</h1>
      <h1>
        Abilities:{" "}
        {pokeData && pokeData.abilities.map((ab) => ab.ability.name + " | ")}
      </h1>
      <h1>
        Moves: {pokeData && pokeData.moves.map((m) => m.move.name + " | ")}
      </h1>
      <h1>
        {pokeFlavor?.flavor_text_entries[0].flavor_text}
      </h1>
      <h1>Evolutions:
        {
          evolutionArray
        }
      </h1>
        fefefef
      {evolutionData && GetEvolutionArray(evolutionData).map((pic, index) => (
        <div>
          <img key={index} src={pic} alt="" />
        </div>
      ))}
      <img
        src={
          pokeData && pokeData.sprites.other["official-artwork"].front_default
        }
      />
      <img
        src={pokeData && pokeData.sprites.other["official-artwork"].front_shiny}
      /> */}
    </div>
  );
}

export default App;
