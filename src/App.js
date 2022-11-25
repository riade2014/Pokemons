import React, { useEffect, useState } from "react";
import Pokemon from "./composants/Pokemon";

function App() {
const [allPokemons, setAllPokemons] = useState([]);
const [loadPokemon, setLoadPokemon] = useState(
	"https://pokeapi.co/api/v2/pokemon?limit=20"
);
const getAllPokemons = async () => {
	const res = await fetch(loadPokemon);
	const data = await res.json();
	setLoadPokemon(data.next);

	function createPokemonObject(result) {
	result.forEach(async (pokemon) => {
		const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
		);
		const data = await res.json();
		setAllPokemons((currentList) => [...currentList, data]);
	});
	}
	createPokemonObject(data.results);
	//console.log(allPokemons);
};
useEffect(() => {
	getAllPokemons();
}, []);
console.log(allPokemons);
return (
	<div className="app-container">
	<h1>Pokemons</h1>

	<div className="pokemon-container">
		<div className="all-container">
			
		{allPokemons.map((pokemon, index) => (
			//ici je parcours la liste des pokemons et je recupere les caracteristiques 
			//de chaque pokemon
			<Pokemon
			//id={pokemon.id}
			name={pokemon.name}
			image=
	{pokemon.sprites.other.dream_world.front_default}
			type={pokemon.types[0].type.name}
			key={index}
			height={pokemon.height}
			weight={pokemon.weight}
			stat1={pokemon.stats[0].stat.name}
			stat2={pokemon.stats[1].stat.name}
			stat3={pokemon.stats[2].stat.name}
			stat4={pokemon.stats[3].stat.name}
			stat5={pokemon.stats[4].stat.name}
			stat6={pokemon.stats[5].stat.name}
			bs1={pokemon.stats[0].base_stat}
			bs2={pokemon.stats[1].base_stat}
			bs3={pokemon.stats[2].base_stat}
			bs4={pokemon.stats[3].base_stat}
			bs5={pokemon.stats[4].base_stat}
			bs6={pokemon.stats[5].base_stat}
			/>
		))}
		</div>
		<button className="load-more"
		//grace à ce bouton on recharge plus d'elements
		onClick={() => getAllPokemons()}>
		plus de Pokemons
		</button>
	</div>
	</div>
);
}

export default App;
