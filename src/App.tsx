"use client";
import React, { useEffect } from "react";
import "./App.css";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { GetEvolutionData, GetFlavorText, GetPokemonData, GetPokemonLocationData } from "./Data/DataService";
import { IEvolutions, IFlavorText, IPokemonData, PokeLocationData } from "./Interfaces/Interfaces";
import { GetEvolutionArray } from "./Utils/HandleEvolutions";

function App() {
  const [count, setCount] = useState<number>(3);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [pokeData, setPokeData] = useState<IPokemonData>();
  const [pokeFlavor, setPokeFlavor] = useState<IFlavorText>();
  const [pokeLocationData, setPokeLocationData] = useState<PokeLocationData>();
  const [searchName, setSearchName] = useState<string | number>("1");
  const [evolutionData, setEvolutionData] = useState<IEvolutions>();

  const handleCount = () => {
    setCount(count + 1);
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
    console.log(evolutionData&& GetEvolutionArray(evolutionData));
  }, [count]);

  return (
    <div className="mx-4">
      <button onClick={() => setOpenModal(true)}>Toggle modal</button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setOpenModal(false)}>I accept</button>
          <button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </button>
        </Modal.Footer>
      </Modal>
      <input
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
        
         evolutionData && GetEvolutionArray(evolutionData)?.map(evol => (
            evol[0]
          ))
          
        }
      </h1>
      <img
        src={
          pokeData && pokeData.sprites.other["official-artwork"].front_default
        }
      />
      <img
        src={pokeData && pokeData.sprites.other["official-artwork"].front_shiny}
      />
      {/* <img
        src={pokeData && pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default}
      /> */}
    </div>
  );
}

export default App;
