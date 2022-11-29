import React, { useEffect, useState } from "react";
import Pokemon from "./composants/Pokemon";

function App() {
const [pokemonParEspece,setPokemonParEspece]=useState("");
const [allPokemons, setAllPokemons] = useState([]);
const[radios,setRadios]=useState([]);
useEffect(() => {//recuperation de tous les types
    fetch("https://pokeapi.co/api/v2/type/")
      .then(res => res.json())
      .then((response) => {
          setRadios(response.results);
        }
      )
}, []);
console.log(radios);
//const radios=["fire","poison","fighting","normal","bug","grass"];
const [loadPokemon, setLoadPokemon] = useState(
	"https://pokeapi.co/api/v2/pokemon?limit=20"
);
//const[rangeValue,setRangeValue]=useState(100);
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

	<ul className="radio-container">
                {/*<input type="range" 
                min="1" 
                max="250" 
                defaultValue={loadPokemon}  
                onChange={(e) => setLoadPokemon(e.target.value)}
/>*/}
                {radios && 
				radios.map((pokemon)=>(
					//radios.map((pokemon)=>(
                    <li>
                        <input type="radio"
                        id={pokemon.name} 
                        //name="continentRadio" 
                        checked={pokemon === pokemonParEspece}
                        onChange={(e)=>
                            setPokemonParEspece(e.target.id)}
                        />
                        <label htmlFor={pokemon}>{pokemon.name}</label>
                    </li>
                ))}
            </ul>
            {pokemonParEspece && (
                <button onClick={() => setPokemonParEspece("")}>
                    Annuler la recherche
                </button>
            )}

	<div className="pokemon-container">
		<div className="all-container">
			
		{allPokemons
			.filter((pokemon)=> pokemon.types[0].type.name.includes(pokemonParEspece))
            //.slice(0,loadPokemon)
			.map((pokemon, index) => (
			//ici je parcours la liste des pokemons et je recupere les caracteristiques 
			//de chaque pokemon
			<Pokemon
			id={pokemon.id}
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
