"use client";
import React, { useEffect } from "react";
import "./App.css";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { GetPokemonData } from "./Data/DataService";
import { IPokemonData } from "./Interfaces/Interfaces";

function App() {
  const [count, setCount] = useState<number>(3);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [pokeData, setPokeData] = useState<IPokemonData>();
  const [searchName, setSearchName] = useState<string | number>(2);
  const [moveArray, setMoveArray] = useState<string[]>([""]);

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
    };
    console.log("hi");

    InitPokeFetch(searchName);
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
      <h1>
        Abilities:
        {pokeData && pokeData.abilities.map((ab) => <p>{ab.ability.name}</p>)}
      </h1>
      <h1>
        Moves:
        {pokeData &&
          pokeData.moves.map((m) => {
            // setMoveArray([...moveArray, m.move.name])
            return m.move.name + " | ";
          })}
      </h1>
      <img
        src={
          pokeData && pokeData.sprites.other["official-artwork"].front_default
        }
      ></img>
      <img
        src={pokeData && pokeData.sprites.other["official-artwork"].front_shiny}
      ></img>
      <img
        src={
          pokeData &&
          pokeData.sprites.versions["generation-v"]["black-white"].animated
            .front_default
        }
      ></img>
    </div>
  );
}

export default App;
